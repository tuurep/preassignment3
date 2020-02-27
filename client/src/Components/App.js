import React from 'react';
import './App.css';

import Player from './Player'



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

function App() {
  return (
    <div style={styles.center}>
      <Player />
    </div>
  )
}

export default App
