import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import './Command.scss';

export const Command = () => {

  const [ serverReady, setServerReady ] = useState(true);
  const [ userCommand, setUserCommand ] = useState('');
  const [ response, setResponse ] = useState('');
  const [ xLabel, setXLabel ] = useState('');
  const [ yLabel, setYLabel ] = useState('');

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
          setResponse(res.data);
          console.log("cmd", userCommand);
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
    console.log("cmd", userCommand);
    axios
      .get('https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/'+userCommand)
      .then(res => {
        if (res.status === 200) {
          setResponse(userCommand+' '+res.data);
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
      .get('https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/TRACE')
      .then(res => {
        if (res.status === 200) {
          console.log("hi", res.data.xLabel);
        }
      })
      .catch(error => {
        console.log('error', error);
      })
  }
  const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774"
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
          <Line data={data} />
        </div>
      ) : (
        'Server not responding...'
      )}
    </div>
  );
}

export default Command;
