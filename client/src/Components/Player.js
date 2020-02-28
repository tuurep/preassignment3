import React, { useState, useEffect } from 'react';
import CounterButton from './CounterButton';
import './Player.css'

const Player = () => {
  const [points, setPoints] = useState(20)

  const setPointsFromLocalStorage = () => {
    const localPoints = localStorage.getItem('points')
    if (localPoints) {
      setPoints(JSON.parse(localPoints))
    }
  }

  window.onstorage = event => {
    // For synching multiple tabs of same player:
    // Listens to changes of state in Local Storage
    setPointsFromLocalStorage()
  }

  useEffect(() => {
    // Flaw in my app:
    // Player can set any points for themselves in browser's Local Storage, if they know how. 
    // I acknowledge and accept this flaw in the scope of this preassignment app.
    setPointsFromLocalStorage()
  }, [])

  useEffect(() => {
    localStorage.setItem('points', JSON.stringify(points))
  }, [points])

  const renderPointsArea = () => {
    if (points <= 0) {
      return (
        <div>
          <div className="PointsDisplayHeader">You've lost all points!</div>
          <div className="PointsDisplay">
            <button className="RestartButton" onClick={() => { setPoints(20) }}>
              Start over
            </button>
          </div>
        </div>
      )
    }

    else return (
      <div>
        <div className="PointsDisplayHeader">Your points:</div>
        <div className="PointsDisplay">{ points }</div>
      </div>
    )
  }

  return (
    <div>
      <CounterButton 
        points={points}
        setPoints={setPoints}
      />
      { renderPointsArea() }
    </div>
  )
}

export default Player