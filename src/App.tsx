import { useEffect, useState } from 'react'
import LineUp from './component/LineUp'
import SelectPlayerContainer from './component/SelectPlayerContainer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [addedPlayer, setAddedPlayer] = useState<object | null>(null)
  
  useEffect(() => {
    console.log(selectedArea);
    
  }, [selectedArea])

  return (
    <>
      <div className='container'>
        <div>
          <LineUp
            way='Away' 
            addedPlayer={selectedArea?.includes('Away') ? addedPlayer : null}
            setAddedPlayer={setAddedPlayer}
            selectedArea={selectedArea?.includes('Away') ? selectedArea : null}
            setSelectedArea={setSelectedArea}
            />
        </div>
        <SelectPlayerContainer selectedArea={selectedArea} setAddedPlayer={setAddedPlayer} />
        <div>
          <LineUp
            way='Home'
            addedPlayer={selectedArea?.includes('Home') ? addedPlayer : null}
            setAddedPlayer={setAddedPlayer}
            selectedArea={selectedArea?.includes('Home') ? selectedArea : null}
            setSelectedArea={setSelectedArea} />
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
