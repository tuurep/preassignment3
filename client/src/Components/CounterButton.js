import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import io from "socket.io-client";
import './CounterButton.css'

let socket;

const CounterButton = ({ points, setPoints }) => {
  const [count, setCount] = useState()
  const alert = useAlert()
  const ENDPOINT = 'http://localhost:5000'

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on('init counter', (payload) => {
      setCount(payload.counter)
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [])

  useEffect(() => {
    socket.on('increase counter', (payload) => {
      setCount(payload.counter)
    })
  }, [])

  const renderClicksTilWin = () => {
    if (count) {
      const clicksTilNextPrize = 10 - (count % 10)

      return (
        <div>
          <div className="ClickDisplayHeader">
            Clicks until next prize:
          </div>
          <div className="ClickDisplay">
            { clicksTilNextPrize }
          </div>
        </div>
      )
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
      alert.show(<div className="WinAlert">You win <b>{ prize }</b> points!</div>)
    }
      
    return prize
  }

  const handleCounterButtonClick = () => {
    if (points <= 0) {
      alert.show(<div className="ErrorAlert">You're out of points</div>)
    }
    else {
      setPoints(points - 1 + grantPrize())
      socket.emit('increase counter', `Client increases counter, it will be ${count + 1}`);
    }
  }

  return (
    <div>
      { renderClicksTilWin() }
      <button className="RoundButton" onClick={() => {handleCounterButtonClick()}}>
        <div>Increase</div>
        <div>counter</div>
      </button>
    </div>
  )
}

export default CounterButton