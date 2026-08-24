import React, { useState, useEffect } from 'react';

function LiveClock() {

  const [time, setTime] = useState(new Date());

  useEffect(() => {

    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);


    return () => clearInterval(timerId);
  }, []); 

  return (
    <div className="clock-container">

      <h2>Current Time: {time.toLocaleTimeString()}</h2>
    </div>
  );
}

export default LiveClock;
