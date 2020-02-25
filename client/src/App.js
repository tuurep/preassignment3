import React, { useState } from 'react';
import { useAlert } from 'react-alert'
import './App.css';
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

// Move styles to different file . . .
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

  },
  errorAlert: {
    fontSize: 20,
    backgroundColor: "#A9A9A9",
    padding: 40,
    border: "solid"
  },
  winAlert: {
    fontSize: 20,
    backgroundColor: "#f9ff57",
    padding: 40,
    border: "solid"
  }
}

const NameForm = ({ setName }) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    setName(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Choose your name:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

const Player = ({ count, increaseCounter }) => {
  const [points, setPoints] = useState(20);
  const [name, setName] = useState('');

  const alert = useAlert()

  const renderPlayerInfo = () => {
    if (name === '') {  
      return (
        <NameForm setName={setName} />
      )
    }
    else return (
      <div>
        <p style={{"font-size": 24, "font-weight": "bold"}} >{name}</p>
        <p>Points: { points }</p>
      </div>
    )
  }

  const handleCounterButtonClick = () => {
    if (points <= 0) {
      alert.show(<div style={styles.errorAlert}>You're out of points</div>)
    }
    else if (name === '') {
      alert.show(<div style={styles.errorAlert}>You must choose a name</div>)
    }
    else {
      increaseCounter()
      setPoints(points - 1 + grantPrize())
      socket.emit("message", `${name} increased counter, it's now ${count + 1}`);
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
      alert.show(<div style={styles.winAlert}>You win <b>{ prize }</b> points!</div>)
    }
      
    return prize
  }

  return (
    <div>
      <button style={styles.roundButton} onClick={() => {handleCounterButtonClick()}}>
        <div>Increase</div>
        <div>counter</div>
      </button>
    <p>{ renderPlayerInfo() }</p>
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
