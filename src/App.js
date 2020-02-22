import React, { useState } from 'react';
import { useAlert } from 'react-alert'
import './App.css';

const styles = {
  center: {
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    MsTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  }
}

const Player = ({ count, increaseCounter }) => {
  const [points, setPoints] = useState(20);

  const alert = useAlert()

  const handleClick = () => {
    if (points > 0) {
      increaseCounter()
      setPoints(points - 1 + grantPrize())
    }
    else {
      alert.show(<div style={{ color: 'red' }}>You're out of points</div>)
    }
  }

  const grantPrize = () => {
    const new_count = count + 1
    var prize = 0

    if (new_count % 10 === 0)
      prize = 5
    if (new_count % 100 === 0)
      prize = 40
    if (new_count % 500 === 0)
      prize = 250
    
    if (prize !== 0) {
      alert.show(<div>Wow bruh, it turns out you won { prize } points</div>)
    }
      
    return prize
  }

  return (
    <div>
      <button onClick={() => {handleClick()}}>
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
      <h1> { count } </h1>
      <Player count={count} increaseCounter={increaseCounter}></Player>
    </div>
  )
}

function App() {
  return (
    <div style={styles.center}>
      <Counter>
        
      </Counter>
    </div>
  );
}

export default App
