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
  },
  roundButton: {
    borderRadius: "50%",
    padding: 58,
    backgroundColor: "#ff4f28",
    outline: "none",
    fontSize: "30px",
    fontFamily: "Montserrat",
    textShadow: "4px 4px black",
    color: "white",
    lineHeight: 1.9,
    boxShadow: "5px 10px #282828",
    marginBottom: "80px"
  },
  playerInfo: {

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
      alert.show(`You win ${ prize } points!`)
    }
      
    return prize
  }

  return (
    <div>
      <button style={styles.roundButton} onClick={() => {handleClick()}}>
        <div>Increase</div>
        <div>counter</div>
      </button>
      <p> You have { points } points </p>
    </div>
  )
}

const Counter = () => {
  const [count, setCount] = useState(0);

  const increaseCounter = () => {
    if (count === 500) {
      // Since counter isn't visible, it can be reset at 500
      // to avoid hitting any max cap for integer
      setCount(0)
    }
    else {
      setCount(count + 1)
    }
  }

  return (
    <div>
      <i>(will be hidden later)</i>
      <h1>{ count }</h1>
      <Player 
        count={count}
        increaseCounter={increaseCounter}
        style={styles.playerInfo}>
      </Player>
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
