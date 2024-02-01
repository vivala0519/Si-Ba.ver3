import { useState } from 'react'
import styled from 'styled-components'
import LineUp from './component/LineUp'
import SelectPlayerContainer from './component/SelectPlayerContainer'
import playButton from './assets/play.svg'
import { gameProcess } from './api/gameProcess.js'
import './App.css'

function App() {

  interface LineUp {
    name: string
    position: string
    avg: number
    year: string
  }

  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [addedPlayer, setAddedPlayer] = useState<object | null>(null)
  const [awayLineUpList, setAwayLineUpList] = useState<Array<LineUp | null>>(Array.from({ length: 13 }, () => null));
  const [homeLineUpList, setHomeLineUpList] = useState<Array<LineUp | null>>(Array.from({ length: 13 }, () => null));

  const playButtonHandler = () => {
    gameProcess(homeLineUpList, awayLineUpList)
  }

  return (
    <>
      <Title>Simulation of Baseball</Title>
      <SelectPlayerContainer selectedArea={selectedArea} setAddedPlayer={setAddedPlayer} />
      <div className='container'>
        <div>
          <LineUp
            way='Away' 
            addedPlayer={selectedArea?.includes('Away') ? addedPlayer : null}
            setAddedPlayer={setAddedPlayer}
            selectedArea={selectedArea?.includes('Away') ? selectedArea : null}
            setSelectedArea={setSelectedArea}
            lineUpList={awayLineUpList}
            setLineUpList={setAwayLineUpList}
            />
        </div>
        <div>
          <LineUp
            way='Home'
            addedPlayer={selectedArea?.includes('Home') ? addedPlayer : null}
            setAddedPlayer={setAddedPlayer}
            selectedArea={selectedArea?.includes('Home') ? selectedArea : null}
            setSelectedArea={setSelectedArea}
            lineUpList={homeLineUpList}
            setLineUpList={setHomeLineUpList}
            />
        </div>
      </div>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <PlayButton onClick={playButtonHandler} />
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

const Title = styled.div`
  font-size: 25px;
`