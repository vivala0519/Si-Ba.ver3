import {useState, useEffect, DetailedHTMLProps, HTMLAttributes} from 'react'
import styled from 'styled-components'
import Swal from "sweetalert2"
import LineUp from './component/LineUp'
import LineUpCard from './component/report/LineUpCard.tsx'
import ScoreBoard from './component/report/scoreBoard/ScoreBoard.tsx'
import SelectPlayerContainer from './component/SelectPlayerContainer.tsx'
import PlayerReport from './component/report/PlayerReport.tsx';
import Header from './component/Header.tsx'
import Footer from './component/Footer.tsx'
import styles from './Play.module.scss'
import restart from '@/assets/restart.svg'
import pause from '@/assets/pause.svg'
import { gameProcess } from './api/gameProcess.js'
import './App.css'

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
  $showButton?: boolean
  $ready?: boolean
}

function App() {

  interface LineUp {
    name: string
    position: string
    avg: number
    year: string
  }

//   const dummyData = [
//     {
//       "name": "소크라테스",
//       "team": "MBC",
//       "position": "C",
//       "avg": ".254",
//       "obp": ".343",
//       "slg": ".479",
//       "total_hit": "36",
//       "double_hit": "5",
//       "triple_hit": "0",
//       "home_run": "9",
//       "BB": "21",
//       "SB": "2",
//       "Dead_Ball": "0",
//       "one_hit": 22,
//       "year": "1982"
//   },
//   {
//     "name": "소크라테스",
//     "team": "MBC",
//     "position": "LF",
//     "avg": ".254",
//     "obp": ".343",
//     "slg": ".479",
//     "total_hit": "36",
//     "double_hit": "5",
//     "triple_hit": "0",
//     "home_run": "9",
//     "BB": "21",
//     "SB": "2",
//     "Dead_Ball": "0",
//     "one_hit": 22,
//     "year": "1982"
// },
// {
//   "name": "소크라테스",
//   "team": "MBC",
//   "position": "C",
//   "avg": ".254",
//   "obp": ".343",
//   "slg": ".479",
//   "total_hit": "36",
//   "double_hit": "5",
//   "triple_hit": "0",
//   "home_run": "9",
//   "BB": "21",
//   "SB": "2",
//   "Dead_Ball": "0",
//   "one_hit": 22,
//   "year": "1982"
// },
// {
// "name": "소크라테스",
// "team": "MBC",
// "position": "C",
// "avg": ".254",
// "obp": ".343",
// "slg": ".479",
// "total_hit": "36",
// "double_hit": "5",
// "triple_hit": "0",
// "home_run": "9",
// "BB": "21",
// "SB": "2",
// "Dead_Ball": "0",
// "one_hit": 22,
// "year": "1982"
// },
// {
// "name": "필",
// "team": "MBC",
// "position": "C",
// "avg": ".254",
// "obp": ".343",
// "slg": ".479",
// "total_hit": "36",
// "double_hit": "5",
// "triple_hit": "0",
// "home_run": "9",
// "BB": "21",
// "SB": "2",
// "Dead_Ball": "0",
// "one_hit": 22,
// "year": "1982"
// },
// {
// "name": "한유섬",
// "team": "MBC",
// "position": "C",
// "avg": ".254",
// "obp": ".343",
// "slg": ".479",
// "total_hit": "36",
// "double_hit": "5",
// "triple_hit": "0",
// "home_run": "9",
// "BB": "21",
// "SB": "2",
// "Dead_Ball": "0",
// "one_hit": 22,
// "year": "1982"
// },
// {
// "name": "최정",
// "team": "MBC",
// "position": "C",
// "avg": ".254",
// "obp": ".343",
// "slg": ".479",
// "total_hit": "36",
// "double_hit": "5",
// "triple_hit": "0",
// "home_run": "9",
// "BB": "21",
// "SB": "2",
// "Dead_Ball": "0",
// "one_hit": 22,
// "year": "1982"
// },
// {
// "name": "라가레스",
// "team": "MBC",
// "position": "C",
// "avg": ".254",
// "obp": ".343",
// "slg": ".479",
// "total_hit": "36",
// "double_hit": "5",
// "triple_hit": "0",
// "home_run": "9",
// "BB": "21",
// "SB": "2",
// "Dead_Ball": "0",
// "one_hit": 22,
// "year": "1982"
// },
// {
// "name": "소크라테스",
// "team": "MBC",
// "position": "C",
// "avg": ".254",
// "obp": ".343",
// "slg": ".479",
// "total_hit": "36",
// "double_hit": "5",
// "triple_hit": "0",
// "home_run": "9",
// "BB": "21",
// "SB": "2",
// "Dead_Ball": "0",
// "one_hit": 22,
// "year": "1982"
// }, null,
// {
// "name": "스트레일리",
// "team": "MBC",
// "position": "P",
// "G": "12",
// "Inning": "35.1",
// "avg": ".308",
// "obp": ".355",
// "year": "1982"
// },
// {
// "name": "이승호",
// "team": "MBC",
// "position": "P",
// "G": "12",
// "Inning": "35.1",
// "avg": ".308",
// "obp": ".355",
// "year": "1982"
// },
// null
//   ]

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
  const [onReady, setOnReady] = useState(false)

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
    // console.log(gameResult)
  }

  useEffect(() => {
    const homeLineUpNullCount = homeLineUpList.reduce((count, value) => (value === null ? count + 1 : count), 0)
    const awayLineUpNullCount = awayLineUpList.reduce((count, value) => (value === null ? count + 1 : count), 0)

    setOnReady(homeLineUpNullCount === 1 || awayLineUpNullCount === 1)
  }, [homeLineUpList, awayLineUpList]);

  // useEffect(() => {
  //   // @ts-ignore
  //   setAwayLineUpList(dummyData)
  //   // @ts-ignore
  //   setHomeLineUpList(dummyData)
  // }, [])

  // Report row 배열
  const [reportArr, setReportArr] = useState([])
  // reportArr 순회 중인 index
  const [processIndex, setProcessIndex] = useState(0)
  // intervalId, timeoutId
  const [intervalId, setIntervalId] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)
  // 재생 중: true, 일시정지: false
  const [playState, setPlayState] = useState(true)
  // 재생 속도 조절 state
  const [storedSpeed, setStoredSpeed] = useState(1)
  // 속도 리스트
  const speedList = [1000, 500, 200, 100]
  // 속도 button text
  const speedButton = ['x1', 'x2', 'x5', 'x10']
  // play button show state
  const [showPlayButton, setShowPlayButton] = useState(false)
  // game finish flag
  const [gameFinish, setGameFinish] = useState(false)

  const sendSplitReport = (report, index, speed) => {
    let i = index;

    const interval = setInterval(() => {
      if (i < report.length) {
        const nextElement = report[i];
        setReportRow(nextElement);
        ++i;
        setProcessIndex(i)
        if (nextElement.topBottom === 'finish') {
          setGameFinish(true)
        }
      } else {
        clearInterval(interval);
      }
    }, speed);

    setIntervalId(interval)

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (showScoreBoard) {
      const timeoutId = setTimeout(() => {
        const gameReport = report['report']
        const tempArr = [...gameReport]
        tempArr.push({topBottom: 'finish'})
        setReportArr(tempArr)
        sendSplitReport(tempArr, 0, speedList[storedSpeed])
      }, 500)

      setTimeoutId(timeoutId)
      return () => clearTimeout(timeoutId)
    }
  }, [showScoreBoard])

  const restartHandler = (val) => {
    setPlayState(true)
    sendSplitReport(reportArr, processIndex, val)
  }

  const pauseHandler = () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setPlayState(false)
  }

  const setSpeedHandler = () => {
    pauseHandler()
    const speed = storedSpeed + 1 === 4 ? 0 : storedSpeed + 1
    setStoredSpeed(speed)

    setTimeout(() => {
      restartHandler(speedList[speed])
    }, 100)
  }

  return (
    <>
      {!onPlay ?
      <>
        <div className={disappear ? 'onPlay' : ''} style={{display: 'flex', flexDirection: 'column'}}>
          <Header onReady={onReady}/>
          <SelectPlayerContainer selectedArea={selectedArea} setAddedPlayer={setAddedPlayer} />
          {/*SearchBoxContainer*/}
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
                onReady={onReady}
                />
            </div>
            <PlayButtonContainer $ready={onReady}>
              <PlayButton className={`${styles.play} ${onReady ? 'play-button show' : 'play-button'}`} onClick={playButtonHandler}>Play Ball!</PlayButton>
            </PlayButtonContainer>
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
                onReady={onReady}
                />
            </div>
          </div>
        </div>
          <Footer onReady={onReady}/>
          </>
      :
        <>
          <Report>
            <div/>
            <ReportHead>
              <ScoreBoard showScoreBoard={showScoreBoard} gameReportRow={reportRow} showPlayButton={showPlayButton}
                          setShowPlayButton={setShowPlayButton}/>
              {!gameFinish && <ButtonList>
                {playState
                  ?
                  <Pause className='pause' $showButton={showPlayButton} onClick={pauseHandler}
                    onMouseEnter={() => setShowPlayButton(true)}/>
                  :
                  <Restart className='restart' $showButton={showPlayButton} onClick={() => restartHandler(speedList[storedSpeed])}
                    onMouseEnter={() => setShowPlayButton(true)}/>
                }
                <SpeedUp $showButton={showPlayButton} onClick={setSpeedHandler}
                  onMouseEnter={() => setShowPlayButton(true)}>{speedButton[storedSpeed]}</SpeedUp>
              </ButtonList>}
            </ReportHead>
            <div/>
              <PlayerReport
                  key={'awayReport'}
                  way={'away'}
                  pitcherReportRow={reportRow && reportRow['topBottom'] === 'bottom' && reportRow}
                  batterReportRow={reportRow && reportRow['topBottom'] === 'top' && reportRow}
              />
              <LineUpCard
                  onPlay={onPlay}
                  setShowScoreBoard={setShowScoreBoard}
                  awayTeam={awayTeam}
                  homeTeam={homeTeam}
                  awayLineUp={awayLineUpList}
                  homeLineUp={homeLineUpList}
                  gameReportRow={reportRow}
              />
              <PlayerReport
                  key={'homeReport'}
                  way={'home'}
                  pitcherReportRow={reportRow && reportRow['topBottom'] === 'top' && reportRow}
                  batterReportRow={reportRow && reportRow['topBottom'] === 'bottom' && reportRow}
              />
          </Report>
        </>
      }
    </>
  )
}

export default App

const PlayButtonContainer = styled.div<styleProps>`
  position: relative;
  top: 190px;
  display: flex;
  align-items: center;
  width: ${(props) => {
    if (props.$ready) {
      return '80px';
    } else {
      return '40px';
    }
  }};
  height: 80px;
`

const PlayButton = styled.button`
  //font-family: "Giants-Inline", serif;
  //font-family: "HeirofLightBold", serif;
  font-family: "KBO-Dia-Gothic_bold", serif;
  //font-family: "Hahmlet", serif;
  font-style: normal;
  font-weight: 400;
  color: #BB2649;
  cursor: pointer;
  border: none;
  width: 80px;
  height: 80px;
  margin-top: 20px;
  &:hover,
  &:focus {
      outline: none;
  }
`

const Report = styled.div`
  display: grid;
  grid-template-rows: 150px 3fr;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 15px;
  justify-content: center;
  justify-items: center;
  padding-top: 3em;
`

const ReportHead = styled.div`
  padding-left: 4%;
`

const ButtonList = styled.div<styleProps>`
  visibility: ${props => {
    if (props.$showButton) {
      return 'visible';
    } else {
      return 'hidden';
    }
  }};
  position: relative;
  top: -90%;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
`

const Restart = styled.div<styleProps>`
  // background: url(${restart}) no-repeat center center !important;
  // background-size: 100% 100% !important;
  cursor: pointer;
  z-index: 1;
  border: none;
  width: 50px;
  height: 50px;
  visibility: ${props => {
    if (props.$showButton) {
      return 'visible';
    } else {
      return 'hidden';
    }
  }};
`

const Pause = styled.div<styleProps>`
  //background: url(${pause}) no-repeat center center;
  //background-size: 100% 100%;
  cursor: pointer;
  z-index: 1;
  border: none;
  width: 50px;
  height: 50px;
  visibility: ${props => {
    if (props.$showButton) {
      return 'visible';
    } else {
      return 'hidden';
    }
  }};
`

const SpeedUp = styled.span<styleProps>`
  visibility: ${props => {
    if (props.$showButton) {
      return 'visible';
    } else {
      return 'hidden';
    }
  }};
  cursor: pointer;
  position: relative;
  top: -12px;
  font-family: "Road Rage", sans-serif;
  font-weight: 400;
  font-size: 50px;
  font-style: normal;
  width: 50px;
  height: 50px;
  color: #BB2649;
  letter-spacing: 8px;
`