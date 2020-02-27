import React, { useState, useEffect } from 'react';
import CounterButton from './CounterButton'

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

const Player = () => {
  const [points, setPoints] = useState(20)
  const [name, setName] = useState('')

  useEffect(() => {
    const localPoints = localStorage.getItem('points')
    if (localPoints) {
      setPoints(JSON.parse(localPoints))
    }
    const localName = localStorage.getItem('name')
    if (localName) {
      setName(localName)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('points', JSON.stringify(points))
  }, [points])

  useEffect(() => {
    localStorage.setItem('name', name)
  }, [name])

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
      <CounterButton 
        points={points}
        setPoints={setPoints}
        name={name}
      />
      { renderPlayerInfo() }
    </div>
  )
}

export default Player