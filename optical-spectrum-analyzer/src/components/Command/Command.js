import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import './Command.scss';

export const Command = () => {

  const [ serverReady, setServerReady ] = useState(false);
  const [ userCommand, setUserCommand ] = useState('');
  const [ response, setResponse ] = useState('');
  const [ xLabel, setXLabel ] = useState('');
  const [ yLabel, setYLabel ] = useState('');
  const [ limit, setLimit ] = useState([]);
  const [ xData, setXData ] = useState([]);
  const [ yData, setYData ] = useState([]);

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
          console.log('success', res);
          setResponse(res.data);
          if(userCommand === 'START') {
            getTrace();
          }
        }
      })
      .catch(error => {
        console.log('error', error);
        setResponse(error.message);
      })
  }
  const setAction = (event) => {
    setUserCommand(event.target.id);
    axios
      .get('https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/'+userCommand)
      .then(res => {
        if (res.status === 200) {
          setResponse(res.data);
          if(userCommand === 'START') {
            getTrace();
          }
        }
      })
      .catch(error => {
        console.log('error', error);
        setResponse(error.message);
      })
  }

  const getTrace = () => {
    axios
      .get('https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/LIM')
      .then(res => {
        if (res.status === 200) {
          setLimit([1,2]);
          // get limits
          console.log("lim", res.data);
        }
      })
      .catch(error => {
        console.log('error', error);
      })
    axios
      .get('https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/TRACE')
      .then(res => {
        if (res.status === 200) {
          const selectedXdata = res.data.xdata.filter((elem, index) => index > 1500 && index < 1505);
          console.log('error', selectedXdata);
          setXLabel(selectedXdata);
          setYLabel(res.data.ylabel);
          setXData(res.data.xdata);
          setYData(res.data.ydata);
        }
      })
      .catch(error => {
        console.log('error', error);
      })
  }
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
            onChange={e => setUserCommand(e.target.value)}
            placeholder="eg - IDN"
          />
          <button onClick={makeQuery} className="commmand-query">Query</button>
          <div className="command--actions">
            <button onClick={setAction} id="START" className="command--action">Start</button>
            <button onClick={setAction} id="STOP" className="command--action">Stop</button>
            <button onClick={setAction} id="SINGLE" className="command--action">Single Trace</button>
          </div>
          <h1>Instrument Response</h1>
          { response }
          <Line
            data={data}
          />
        </div>
      ) : (
        'Server not responding...'
      )}
    </div>
  );
}

export default Command;
