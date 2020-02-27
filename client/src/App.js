import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert'
import './App.css';
import io from "socket.io-client";

let socket;
let count = -1; // -1 shows counter value is not yet given by server. It's never used.

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
    boxShadow: "10px 10px 11px 0px rgba(0,0,0,0.74)",
    fontSize: 20,
    backgroundColor: "#A9A9A9",
    padding: 40
  },
  winAlert: {
    boxShadow: "10px 10px 11px 0px rgba(0,0,0,0.74)",
    fontSize: 20,
    backgroundColor: "#f9ff57",
    padding: 40
  }
}

const NameForm = ({ setName }) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
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

const CounterButton = ({ points, setPoints, name }) => {
  const alert = useAlert()

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

  const handleCounterButtonClick = () => {
    if (points <= 0) {
      alert.show(<div style={styles.errorAlert}>You're out of points</div>)
    }
    else if (name === '') {
      alert.show(<div style={styles.errorAlert}>You must choose a name</div>)
    }
    else {
      setPoints(points - 1 + grantPrize())
      socket.emit('increase counter', `${name} increases counter, it will be ${count + 1}`);
    }
  }

  return (
    <button style={styles.roundButton} onClick={() => {handleCounterButtonClick()}}>
      <div>Increase</div>
      <div>counter</div>
    </button>
  )
}

const Player = () => {
  const [points, setPoints] = useState(20);
  const [name, setName] = useState('');
  const ENDPOINT = 'http://localhost:5000'

  useEffect(() => {
    socket = io(ENDPOINT);

    // Debug
    console.log(socket)

    socket.on('init counter', (payload) => {
      //Debug
      console.log(`Client finds out that counter is ${payload.counter} upon joining`)

      count = payload.counter
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [])

  useEffect(() => {
    socket.on('increase counter', (payload) => {
      // Debug
      console.log(`Server tells client that counter is now ${payload.counter} over there`)

      count = payload.counter
    })
  }, [])

  const renderPlayerInfo = () => {
    if (name === '') {  
      return (
        <NameForm setName={setName} />
      )
    }
    else if (points <= 0) {
      return (
        <div>
          You've lost all points!
          <div>
            <button onClick={() => { setPoints(20) }}>
              Start over
            </button>
          </div>
        </div>
      )
    }

    else return (
      <div>
        <p style={{"fontSize": 24, "fontWeight": "bold"}} >{ name }</p>
        <p>Points: { points }</p>
      </div>
    )
  }

  return (
    <div>
      <i>(will be hidden later)</i>
      <h1>{ count + 1 }</h1>

      <CounterButton 
        points={points}
        setPoints={setPoints}
        name={name}
      />
      
      { renderPlayerInfo() }
    </div>
  )
}

function App() {
  return (
    <div style={styles.center}>
      <Player />
    </div>
  )
}

export default App
