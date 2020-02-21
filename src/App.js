import React, { useState } from 'react';
import './App.css';

const Player = (props) => {
  const [points, setPoints] = useState(20);

  return (
    <div>
      <button onClick={() => {
        if (points > 0) {
          props.increaseCounter()
          setPoints(points - 1)
        }
      }}>
        Increase
      </button>
      <p> You have { points } points </p>
    </div>
  )
}

const Counter = () => {
  const [count, setCount] = useState(0);

  const increaseCounter = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p> { count } </p>
      <Player increaseCounter={increaseCounter}></Player>
    </div>
  )
}

function App() {
  return (
    <div>
      <Counter>

      </Counter>
    </div>
  );
}

export default App
