import LineUp from './component/LineUp'
import SelectPlayerContainer from './component/SelectPlayerContainer'
import './App.css'

import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  
  // useEffect(() => {
  //   console.log(selectedArea);
    
  // }, [selectedArea])

  return (
    <>
      <div className='container'>
        <div>
          <LineUp way='Home' selectedArea={selectedArea?.includes('Home') ? selectedArea : null} setSelectedArea={setSelectedArea} />
        </div>
        <SelectPlayerContainer />
        <div>
          <LineUp way='Away' selectedArea={selectedArea?.includes('Away') ? selectedArea : null} setSelectedArea={setSelectedArea} />
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
    </>
  )
}

export default App
