import LineUp from './component/LineUp'
import SelectPlayerContainer from './component/SelectPlayerContainer'
import './App.css'

import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <div className='container'>
        <div>
          <LineUp placeholder='Home' />
        </div>
        <SelectPlayerContainer />
        <div>
          <LineUp placeholder='Away' />
        </div>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
