import { useState } from 'react'
import styled from 'styled-components'
import Swal from "sweetalert2"
import LineUp from './component/LineUp'
import LineUpSheet from './component/LineUpSheet'
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

  const [awayTeam, setAwayTeam] = useState<string | null>(null)
  const [homeTeam, setHomeTeam] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [addedPlayer, setAddedPlayer] = useState<object | null>(null)
  const [awayLineUpList, setAwayLineUpList] = useState<Array<LineUp | null>>(Array.from({ length: 13 }, () => null));
  const [homeLineUpList, setHomeLineUpList] = useState<Array<LineUp | null>>(Array.from({ length: 13 }, () => null));
  const [onPlay, setOnPlay] = useState(false)
  const [disappear, setDisappear] = useState(false)

  const playButtonHandler = () => {
    const homeLineUpNullCount = homeLineUpList.reduce((count, value) => (value === null ? count + 1 : count), 0)
    const awayLineUpNullCount = awayLineUpList.reduce((count, value) => (value === null ? count + 1 : count), 0)
    
    if (homeLineUpNullCount > 1 || awayLineUpNullCount > 1) {
      Swal.fire({
        icon: "error",
        title: "모든 선수를 라인업에 등록해야 경기를 시작할 수 있어요!",
      })
      return
    }
    setDisappear(true)
    setTimeout(() => {
      setOnPlay(true)
    }, 1000)
    gameProcess(homeLineUpList, awayLineUpList)
  }

  return (
    <>
      <Title>Simulation of Baseball</Title>
      {!onPlay ? 
        <div className={disappear ? 'onPlay' : ''}>
          <SelectPlayerContainer selectedArea={selectedArea} setAddedPlayer={setAddedPlayer} />
          <div className='container'>
            <div>
              <LineUp
                way='Away' 
                team={awayTeam}
                setTeam={setAwayTeam}
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
                team={homeTeam}
                setTeam={setHomeTeam}
                addedPlayer={selectedArea?.includes('Home') ? addedPlayer : null}
                setAddedPlayer={setAddedPlayer}
                selectedArea={selectedArea?.includes('Home') ? selectedArea : null}
                setSelectedArea={setSelectedArea}
                lineUpList={homeLineUpList}
                setLineUpList={setHomeLineUpList}
                />
            </div>
          </div>
        </div>
      : <LineUpSheet onPlay={onPlay} awayTeam={awayTeam} homeTeam={homeTeam} awayLineUp={awayLineUpList} homeLineUp={homeLineUpList} />
      }
      <div className="card">
        {onPlay ? <></> : <PlayButton onClick={playButtonHandler} />}
      </div>
      <footer>footer</footer>
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

const Title = styled.header`
  font-size: 25px;
`