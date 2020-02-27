import React, { useState, useEffect } from 'react';
import CounterButton from './CounterButton'

const Player = () => {
  const [points, setPoints] = useState(20)

  useEffect(() => {
    // Flaw in my app:
    // Player can set any points for themselves in browser's Local Storage, if they know how. 
    // I acknowledge and accept this flaw in the scope of this preassignment app.
    // Another problem:
    // Player can open multiple tabs and their points are not synchronized unless page is refreshed.
    // Both of these are just unintended ways to play the game, but would be big problems in a more
    // critical application.
    
    const localPoints = localStorage.getItem('points')
    if (localPoints) {
      setPoints(JSON.parse(localPoints))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('points', JSON.stringify(points))
  }, [points])

  const renderPointsArea = () => {
    if (points <= 0) {
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
        <p>Your points: { points }</p>
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