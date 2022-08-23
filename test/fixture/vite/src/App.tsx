import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { useMediaQuery } from '../../../../src'

function App() {
  const [count, setCount] = useState(0)
  const mediaQuery = useMediaQuery()

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      <pre>Breakpoint: {mediaQuery.breakpoint}</pre>

      {mediaQuery.isGreaterThan('md') && <pre>Show only on desktop</pre>}
      {mediaQuery.isGreaterThan('sm') && mediaQuery.isLessThan('lg') && <pre>Show only on tablet</pre>}
      {mediaQuery.isLessThan('md') && <pre>Show only on mobile</pre>}
    </div>
  )
}

export default App
