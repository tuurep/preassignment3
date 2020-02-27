import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import io from "socket.io-client";

let socket;

const CounterButton = ({ points, setPoints, name }) => {
  const [count, setCount] = useState(-1)
  const alert = useAlert()
  const ENDPOINT = 'http://localhost:5000'

  useEffect(() => {
    socket = io(ENDPOINT);

    // Debug
    console.log(socket)

    socket.on('init counter', (payload) => {
      //Debug
      console.log(`Client finds out that counter is ${payload.counter} upon joining`)

      setCount(payload.counter)
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

      setCount(payload.counter)
    })
  }, [])

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
      alert.show(<div /*style={styles.winAlert}*/>You win <b>{ prize }</b> points!</div>)
    }
      
    return prize
  }

  const handleCounterButtonClick = () => {
    if (points <= 0) {
      alert.show(<div /*style={styles.errorAlert}*/>You're out of points</div>)
    }
    else if (name === '') {
      alert.show(<div /*style={styles.errorAlert}*/>You must choose a name</div>)
    }
    else {
      setPoints(points - 1 + grantPrize())
      socket.emit('increase counter', `${name} increases counter, it will be ${count + 1}`);
    }
  }

  return (
    <div>
      <i>(will be hidden later)</i>
      <h1>{ count }</h1>
      <button /*style={styles.roundButton}*/ onClick={() => {handleCounterButtonClick()}}>
        <div>Increase</div>
        <div>counter</div>
      </button>
    </div>
  )
}

export default CounterButton