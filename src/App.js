import React, { useState } from 'react';
import './App.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
      <p> { count } </p>
    </div>
  )
}

function App() {
  return (
    <div>
      <Counter>

      </Counter>
    </div>
  );
}

export default App
