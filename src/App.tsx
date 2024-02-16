import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Swal from "sweetalert2"
import LineUp from './component/LineUp'
import LineUpSheet from './component/LineUpSheet'
import ScoreBoard from './component/ScoreBoard'
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
  const dummyData = [
    {
      "name": "소크라테스",
      "team": "MBC",
      "position": "C",
      "avg": ".254",
      "obp": ".343",
      "slg": ".479",
      "total_hit": "36",
      "double_hit": "5",
      "triple_hit": "0",
      "home_run": "9",
      "BB": "21",
      "SB": "2",
      "Dead_Ball": "0",
      "one_hit": 22,
      "year": "1982"
  }, 
  {
    "name": "소크라테스",
    "team": "MBC",
    "position": "C",
    "avg": ".254",
    "obp": ".343",
    "slg": ".479",
    "total_hit": "36",
    "double_hit": "5",
    "triple_hit": "0",
    "home_run": "9",
    "BB": "21",
    "SB": "2",
    "Dead_Ball": "0",
    "one_hit": 22,
    "year": "1982"
}, 
{
  "name": "소크라테스",
  "team": "MBC",
  "position": "C",
  "avg": ".254",
  "obp": ".343",
  "slg": ".479",
  "total_hit": "36",
  "double_hit": "5",
  "triple_hit": "0",
  "home_run": "9",
  "BB": "21",
  "SB": "2",
  "Dead_Ball": "0",
  "one_hit": 22,
  "year": "1982"
}, 
{
"name": "소크라테스",
"team": "MBC",
"position": "C",
"avg": ".254",
"obp": ".343",
"slg": ".479",
"total_hit": "36",
"double_hit": "5",
"triple_hit": "0",
"home_run": "9",
"BB": "21",
"SB": "2",
"Dead_Ball": "0",
"one_hit": 22,
"year": "1982"
}, 
{
"name": "필",
"team": "MBC",
"position": "C",
"avg": ".254",
"obp": ".343",
"slg": ".479",
"total_hit": "36",
"double_hit": "5",
"triple_hit": "0",
"home_run": "9",
"BB": "21",
"SB": "2",
"Dead_Ball": "0",
"one_hit": 22,
"year": "1982"
}, 
{
"name": "한유섬",
"team": "MBC",
"position": "C",
"avg": ".254",
"obp": ".343",
"slg": ".479",
"total_hit": "36",
"double_hit": "5",
"triple_hit": "0",
"home_run": "9",
"BB": "21",
"SB": "2",
"Dead_Ball": "0",
"one_hit": 22,
"year": "1982"
}, 
{
"name": "최정",
"team": "MBC",
"position": "C",
"avg": ".254",
"obp": ".343",
"slg": ".479",
"total_hit": "36",
"double_hit": "5",
"triple_hit": "0",
"home_run": "9",
"BB": "21",
"SB": "2",
"Dead_Ball": "0",
"one_hit": 22,
"year": "1982"
}, 
{
"name": "라가레스",
"team": "MBC",
"position": "C",
"avg": ".254",
"obp": ".343",
"slg": ".479",
"total_hit": "36",
"double_hit": "5",
"triple_hit": "0",
"home_run": "9",
"BB": "21",
"SB": "2",
"Dead_Ball": "0",
"one_hit": 22,
"year": "1982"
}, 
{
"name": "소크라테스",
"team": "MBC",
"position": "C",
"avg": ".254",
"obp": ".343",
"slg": ".479",
"total_hit": "36",
"double_hit": "5",
"triple_hit": "0",
"home_run": "9",
"BB": "21",
"SB": "2",
"Dead_Ball": "0",
"one_hit": 22,
"year": "1982"
}, null, 
{
"name": "켈리",
"team": "MBC",
"position": "P",
"G": "12",
"Inning": "35.1",
"avg": ".308",
"obp": ".355",
"year": "1982"
},
{
"name": "이승호",
"team": "MBC",
"position": "P",
"G": "12",
"Inning": "35.1",
"avg": ".308",
"obp": ".355",
"year": "1982"
},
{
"name": "라가레스",
"team": "MBC",
"position": "P",
"G": "12",
"Inning": "35.1",
"avg": ".308",
"obp": ".355",
"year": "1982"
}
  ]

  const [awayTeam, setAwayTeam] = useState<string | null>(null)
  const [homeTeam, setHomeTeam] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [addedPlayer, setAddedPlayer] = useState<object | null>(null)
  const [awayLineUpList, setAwayLineUpList] = useState<Array<LineUp | null>>(Array.from({ length: 13 }, () => null));
  const [homeLineUpList, setHomeLineUpList] = useState<Array<LineUp | null>>(Array.from({ length: 13 }, () => null));
  const [onPlay, setOnPlay] = useState(false)
  const [showScoreBoard, setShowScoreBoard] = useState(false)
  const [disappear, setDisappear] = useState(false)
  const [report, setReport] = useState<object | null>(null)
  const [reportRow, setReportRow] = useState<object | null>(null)

  const playButtonHandler = async () => {
    const homeLineUpNullCount = homeLineUpList.reduce((count, value) => (value === null ? count + 1 : count), 0)
    const awayLineUpNullCount = awayLineUpList.reduce((count, value) => (value === null ? count + 1 : count), 0)
    
    if (homeLineUpNullCount > 1 || awayLineUpNullCount > 1) {
      Swal.fire({
        icon: "error",
        title: "모든 선수를 라인업에 등록해야 경기를 시작할 수 있어요!",
      })
      return
    }
    const gameResult = await gameProcess(homeLineUpList, awayLineUpList)
    setDisappear(true)
    setTimeout(() => {
      setOnPlay(true)
    }, 1000)
    setReport(gameResult)
    console.log(gameResult)
  }

  useEffect(() => {
    setAwayLineUpList(dummyData)
    setHomeLineUpList(dummyData)
  }, [])

  
  // const fileName = `./stat_scraper/batter.json`
  // import(fileName).then(module => module.default).then(res => {
  //   console.log(res)
  //   const lengthSet = new Set()
  //   Object.values(res).map(year => year.forEach(p => {
  //     if (p.name.length === 2) {
  //       console.log(p.name, p.team);
  //     }
  //     lengthSet.add(p.name.length)
  //   }))
  //   console.log(lengthSet);
  //   }
    
  // )

  return (
    <>
      {!onPlay ? 
        <div className={disappear ? 'onPlay' : ''}>
        <Title>Simulation of Baseball</Title>
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
      : 
      <>
        <ScoreBoard showScoreBoard={showScoreBoard} gameReportRow={reportRow}/>
        <LineUpSheet onPlay={onPlay} setShowScoreBoard={setShowScoreBoard} awayTeam={awayTeam} homeTeam={homeTeam} awayLineUp={awayLineUpList} homeLineUp={homeLineUpList} />
      </>
      }
      {onPlay ? 
        <></> : 
        <PlayButton onClick={playButtonHandler} />
      }
      {!onPlay ? <footer>footer</footer> : <></>}
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