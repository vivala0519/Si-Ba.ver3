import { useState } from 'react'
import styled from 'styled-components'
import LineUp from './component/LineUp'
import SelectPlayerContainer from './component/SelectPlayerContainer'
import playButton from './assets/play.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [addedPlayer, setAddedPlayer] = useState<object | null>(null)

  return (
    <>
      <SelectPlayerContainer selectedArea={selectedArea} setAddedPlayer={setAddedPlayer} />
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
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <PlayButton />
        <p>
          footer
        </p>
      </div>
    </>
  )
}

export default App


const PlayButton = styled.button`
    background: url(${playButton}) no-repeat center center;
    ackground-size: cover;
    cursor: pointer;
    border: none;
    width: 80px;
    height: 80px;
    &:hover,
    &:focus {
        outline: none;
    }
  `