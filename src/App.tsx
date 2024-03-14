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
import ball from '@/assets/ball.png'
import Light from '@/assets/light.svg?react'
import { gameProcess } from './api/gameProcess.js'
import './App.css'

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
  $showButton?: boolean
  $ready?: boolean
  $hover?: boolean
  $isMobile?: boolean
  $lightSize?: number
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

  const [isMobile, setIsMobile] = useState(false)

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
  const [lightSize, setLightSize] = useState(3)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 820) {
        setIsMobile(false)
      }
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // const checkMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const checkMobile = window.innerWidth < 821

    setIsMobile(checkMobile)
  }, []);

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

    setOnReady(homeLineUpNullCount === 1 && awayLineUpNullCount === 1)

    const filledCount = 24 - (homeLineUpNullCount + awayLineUpNullCount - 2)
    setLightSize(filledCount + 3)

  }, [homeLineUpList, awayLineUpList]);

  // useEffect(() => {
  //   setAwayLineUpList(dummyData)
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
  const [storedSpeed, setStoredSpeed] = useState(2)
  // 속도 리스트
  const speedList = [1000, 500, 200, 100]
  // 속도 button text
  const speedButton = ['x1', 'x2', 'x5', 'x10']
  // play button show state
  const [showPlayButton, setShowPlayButton] = useState(false)
  // play button hover state
  const [hoverPlayButton, setHoverPlayButton] = useState(false)
  // ball spin speed
  const [fastBall, setFastBall] = useState('low')
  // game finish flag
  const [gameFinished, setGameFinished] = useState(false)
  // report for mobile
  const [homeMobileReport, setHomeMobileReport] = useState({
    kCount: ['', '', ''], ballCount: ['', '', ''], pitcherInning: ['', '', ''], pitcherOut: ['', '', ''], pitcherLost: ['', '', ''], batterReport: {}, batterTotalReport: ['']
  })
  const [awayMobileReport, setAwayMobileReport] = useState({
    kCount: ['', '', ''], ballCount: ['', '', ''], pitcherInning: ['', '', ''], pitcherOut: ['', '', ''], pitcherLost: ['', '', ''], batterReport: {}, batterTotalReport: ['']
  })

  const sendSplitReport = (report, index, speed) => {
    let i = index;

    const interval = setInterval(() => {
      if (i < report.length) {
        const nextElement = report[i];
        setReportRow(nextElement);
        ++i;
        setProcessIndex(i)
        if (nextElement.topBottom === 'finish') {
          setGameFinished(true)
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

  // 재시작 func.
  const restartHandler = (val) => {
    setPlayState(true)
    sendSplitReport(reportArr, processIndex, val)
  }

  // 일시정지 func.
  const pauseHandler = () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setPlayState(false)
  }

  // 속도 조절 func
  const setSpeedHandler = () => {
    pauseHandler()
    const speed = storedSpeed + 1 === 4 ? 0 : storedSpeed + 1
    setStoredSpeed(speed)

    setTimeout(() => {
      restartHandler(speedList[speed])
    }, 100)
  }

  // home 으로 돌아왔을 때 초기화
  useEffect(() => {
    if (!onPlay) {
      setGameFinished(false)
      setShowScoreBoard(false)
      setDisappear(false)
      setReport(null)
      setHoverPlayButton(false)
    }
  }, [onPlay]);

  useEffect(() => {
    if (onReady) {
      const timeout1 = setTimeout(() => {
        setFastBall('middle')
      }, 1000)
      const timeout2 = setTimeout(() => {
        setFastBall('high')
      }, 2500)
      const timeout3 = setTimeout(() => {
        setFastBall('veryHigh')
      }, 4000)
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    } else {
      setFastBall('low')
    }
  }, [onReady]);

  // 모바일에서 더블 터치 block
  const handleTouchStart = (event) => {
    event.preventDefault();
  }

  return (
      <>
        {!onPlay ?
            <div className={disappear ? 'body-container onPlay' : 'body-container'} style={{display: 'flex', flexDirection: 'column'}} onTouchStart={handleTouchStart}>
              <Header onReady={onReady}/>
              <SelectPlayerContainer selectedArea={selectedArea} setAddedPlayer={setAddedPlayer} />
              {/*SearchBoxContainer*/}
              <div className={'container'}>
                <div style={{width: '100%'}}>
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
                <StyledLight $ready={onReady} $lightSize={lightSize} />
                <PlayButtonContainer $ready={onReady} onMouseEnter={() => setHoverPlayButton(true)} onMouseLeave={() => setHoverPlayButton(false)}>
                  <PlayButton className={`${!hoverPlayButton ? styles.hoverPlay : styles.play} ${onReady ? 'play-button show' : 'play-button'}`} $ready={onReady} onClick={playButtonHandler}>Play Ball!</PlayButton>
                  <PlayButtonBorder $ready={onReady} $hover={!hoverPlayButton}/>
                  {!hoverPlayButton && <Ball $ready={onReady} className={fastBall === 'low'? 'ball' : fastBall === 'middle' ? 'fast-ball' : fastBall === 'high' ? 'more-fast-ball' : 'the-most-fast-ball'} />}
                </PlayButtonContainer>
                <div style={{width: '100%'}}>
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
              <Footer onReady={onReady}/>
            </div>
            :
            <Report>
              {!isMobile && <div/>}
              <ReportHead>
                <ScoreBoard
                    showScoreBoard={showScoreBoard}
                    gameReportRow={reportRow}
                    showPlayButton={showPlayButton}
                    setShowPlayButton={setShowPlayButton}
                    gameFinished={gameFinished}
                    setOnPlay={setOnPlay}
                />
                {!gameFinished && <ButtonList>
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
              {<><div/>
                <PlayerReport
                    key={'awayReport'}
                    way={'away'}
                    pitcherReportRow={reportRow && reportRow['topBottom'] === 'bottom' && reportRow}
                    batterReportRow={reportRow && reportRow['topBottom'] === 'top' && reportRow}
                    setMobileReport={setAwayMobileReport}
                /></>}
              <LineUpCard
                  onPlay={onPlay}
                  setShowScoreBoard={setShowScoreBoard}
                  awayTeam={awayTeam}
                  homeTeam={homeTeam}
                  awayLineUp={awayLineUpList}
                  homeLineUp={homeLineUpList}
                  gameReportRow={reportRow}
                  isMobile={isMobile}
                  homeMobileReport={homeMobileReport}
                  awayMobileReport={awayMobileReport}
              />
              {<PlayerReport
                  key={'homeReport'}
                  way={'home'}
                  pitcherReportRow={reportRow && reportRow['topBottom'] === 'top' && reportRow}
                  batterReportRow={reportRow && reportRow['topBottom'] === 'bottom' && reportRow}
                  setMobileReport={setHomeMobileReport}
              />}
            </Report>
        }
      </>
  )
}

export default App

const PlayButtonContainer = styled.div<styleProps>`
  position: absolute;
  top: 35%;
  display: flex;
  align-items: center;
  /* width: 80px; */
  height: 80px;
  width: 80px;
  left: 43%;
  z-index: 1;
  @media (max-width: 821px) {
    left: 40%;
  }
  @media (max-width: 400px) {
    left: 39%;
  }
  @media (max-width: 380px) {
    left: 38%;
  }
`

const StyledLight = styled(Light)<styleProps>`
  display: ${props => props.$ready ? 'none !important' : 'block'};
  position: absolute;
  width: ${props => props.$lightSize + '%'};
  height: ${props => props.$lightSize + '%'};
  top: ${props => 42 - (props.$lightSize / 3) + '%'};
`

const PlayButton = styled.button<styleProps>`
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
  display: ${props => props.$ready ? 'block' : 'none'};
  z-index: 1;
  &:hover,
  &:focus {
    outline: none;
  }
  @media (max-width: 821px) {
    filter: opacity(0.7);
  }
`

const PlayButtonBorder = styled.div<styleProps>`
  display: ${props => props.$ready ? 'block' : 'none'};
  --borderWidth: 2px;
  position: relative;
  top: -22px;
  left: -3px;
  border-radius: var(--borderWidth);

  &::after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    width: 90px;
    height: 90px;
    background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
    //border-radius: calc(2 * var(--borderWidth));
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    background-size: 300% 300%;
    //filter: blur(5px);
    //border-radius: 50%;
    border-radius: ${props => props.$hover ? '50%' : 'calc(2 * var(--borderWidth))'};;
    filter: ${props => props.$hover ? 'blur(30px)' : 'blur(5px)'};
  };
`

const Ball = styled.div<styleProps>`
  display: ${props => props.$ready ? 'block' : 'none'};
  position: relative;
  top: 20px;
  background: url(${ball}) no-repeat center center;
  background-size: 200% 200%;
  cursor: pointer;
  pointer-events: none;
  width: 80px;
  height: 80px;
  z-index: 5;
`

const Report = styled.div<styleProps>`
  display: grid;
  grid-template-rows: 150px 3fr;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 15px;
  //display: flex;
  //flex-direction: column;
  justify-content: center;
  justify-items: center;
  padding-top: 3em;
  @media (max-width: 821px) {
    display: flex;
    grid-template-columns: none;
    width: 100%;
    flex-direction: column;
    gap: 0;
    align-items: center;
  };
`

const ReportHead = styled.div`
  padding-left: 4%;
  position: relative;
  width: 100%;
  @media (max-width: 821px) {
    padding-left: 0;
    //position: relative;
    //width: 100%;
    //top: 6%;
  }
`

const ButtonList = styled.div<styleProps>`
  visibility: ${props => {
    if (props.$showButton) {
      return 'visible';
    } else {
      return 'hidden';
    }
  }};
  position: absolute;
  top: 36%;
  left: 36%;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;

  @media (max-width: 831px) {
    position: absolute;
    top: 36%;
    left: 36%;
    gap: 15px;
  }
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