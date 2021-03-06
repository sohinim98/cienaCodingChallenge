import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import './Command.scss';

export const Command = () => {

  const [ graphReset, setGraphReset ] = useState(true);
  const [ serverReady, setServerReady ] = useState(false);
  const [ userCommand, setUserCommand ] = useState('');
  const [ response, setResponse ] = useState('$ The response shows up here...');
  const [ xLabel, setXLabel ] = useState('');
  const [ yLabel, setYLabel ] = useState('');
  const [ lowerLimit, setLowerLimit ] = useState('');
  const [ upperLimit, setUpperLimit ] = useState('');
  const [ xData, setXData ] = useState([]);
  const [ yData, setYData ] = useState([]);
  const [ yMax, setYMax ] = useState(0);
  const [ yMin, setYMin ] = useState(0);
  const [ traceCalledToggle, setTraceCalledToggle ] = useState(false);

  useEffect(() => {
    axios
      .get('https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/PING')
      .then(res => {
        if (res.status === 200) {
          setServerReady(true);
        }
      })
      .catch(error => {
        console.log('error', error);
      })
  }, [])
  const makeQuery = () => {
    axios
      .get('https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/'+userCommand)
      .then(res => {
        if (res.status === 200) {
          setResponse('$ ' + JSON.stringify(res.data).substring(0, 200));
          if(userCommand === 'START' || userCommand === 'SINGLE') {
            getTrace();
          }
          else if(userCommand === 'STOP') {
            setGraphReset(true);
          }
        }
      })
      .catch(error => {
        console.log('error', error);
        setResponse('$' + error.message);
      })
  }
  const setAction = (event) => {
    setUserCommand(event.target.id);
    let currentCommand = event.target.id;
    axios
      .get('https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/'+currentCommand)
      .then(res => {
        if (res.status === 200) {
          setResponse('$ ' + JSON.stringify(res.data).substring(0, 200));
          if(currentCommand === 'START' || currentCommand === 'SINGLE') {
            getTrace();
          }
          else if(currentCommand === 'STOP') {
            setGraphReset(true);
          }
        }
      })
      .catch(error => {
        console.log('error', error);
        setResponse('$ ' + error.message);
      })
  }

  const getTrace = () => {
    axios
      .get('https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/LIM')
      .then(res => {
        if (res.status === 200) {
          setLowerLimit(res.data.substring(8, 12));
          setUpperLimit(res.data.substring(13, 18));
          setTraceCalledToggle(!traceCalledToggle);
        }
      })
      .catch(error => {
        console.log('error', error);
      })
  }

  useEffect(() => {
    axios
    .get('https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/TRACE')
    .then(res => {
      if (res.status === 200) {
        const selectedXdata = res.data.xdata.filter((elem, index) => index > Number(lowerLimit) && index < Number(upperLimit));
        const selectedYdata = res.data.ydata.filter((elem, index) => index > Number(lowerLimit) && index < Number(upperLimit));
        const currYMax = selectedYdata.reduce((prev, current) => {
          return (prev > current) ? prev : current;
        })
        const currYMin = selectedYdata.reduce((prev, current) => {
          return (prev < current) ? prev : current;
        })
        setYMax(currYMax);
        setYMin(currYMin);
        setXLabel(res.data.xlabel);
        setYLabel(res.data.ylabel);
        setXData(selectedXdata);
        setYData(selectedYdata);
        if (upperLimit !== 0 && lowerLimit !== 0) {
          setGraphReset(false);
        }
      }
    })
    .catch(error => {
      console.log('error', error);
    })
  }, [upperLimit, lowerLimit, traceCalledToggle])


  const data = {
  labels: [xData],
  datasets: [
    {
      label: yLabel,
      data: yData,
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    }
  ]
};

  return (
    <div className="command">
      { serverReady ? (
        <div>
          <input
            className="command--input"
            type="text"
            value={userCommand}
            onChange={event => setUserCommand(event.target.value.toUpperCase())}
            placeholder="eg - IDN"
          />
        <div className="command--note">*Note - The query 'SINGLE' takes a while to get a response</div>
            <button onClick={makeQuery} className="commmand-query">Query</button>
            <div className="command--actions">
              <button onClick={setAction} id="START" className="command--action">Start</button>
              <button onClick={setAction} id="STOP" className="command--action">Stop</button>
              <button onClick={setAction} id="SINGLE" className="command--action">Single Trace</button>
            </div>
            <h1>Instrument Response</h1>
            <div className="command--response">
              { response }
            </div>
            { graphReset ? 'Type START to draw the graph...' : (
              <Line
                width={900}
                height={550}
                data={data}
                options={{
                  scales: {
                    xAxes: [
                      {
                        ticks: {
                          display: false,
                          min: Number(lowerLimit),
                          max: Number(upperLimit),
                          stepSize: 0.0001
                        }
                      }
                    ],
                    yAxes: [
                      {
                        ticks: {

                          min: yMin,
                          max: yMax,
                          stepSize: 0.001
                        }
                      }
                    ]
                  }
                }}
              />
            )}
          </div>
        ) : (
          'Server not responding...'
        )}
    </div>
  );
}

export default Command;
