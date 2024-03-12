import { useState, useEffect, useRef, DetailedHTMLProps, HTMLAttributes } from 'react'
import styled from 'styled-components'

interface PropsType {
    way: string
    pitcherReportRow: object
    batterReportRow: object
}

interface PitcherReport {
    pitcherNum?: number
    pitcherCount?: number
    k?: number
    result: string
    lostScore: number
}

interface BatterReport {
    number: number
    result?: string
}
interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    $way?: string
    $hit?: string
    value?: string
}

const PlayerReport = (props: PropsType) => {
    const containerRef = useRef(null)
    const { way, pitcherReportRow, batterReportRow } = props
    const batters = Array.from({ length: 9 })
    // const [pitcher, setPitcher] = useState(10)
    const [ballCount, setBallCount] = useState([0, 0, 0])
    const [kCount, setKCount] = useState([0, 0, 0])
    const [pitcherOut, setPitcherOut] = useState([0, 0, 0])
    const [pitcherInning, setPitcherInning] = useState(['0', '0', '0'])
    const [pitcherLost, setPitcherLost] = useState([0, 0, 0])
    const [batterReport, setBatterReport] = useState({
        0: ['null'], 1: ['null'], 2: ['null'], 3: ['null'], 4: ['null'], 5: ['null'], 6: ['null'], 7: ['null'], 8: ['null']
    })
    const [batterTotalReport, setBatterTotalReport] = useState(['', '', '', '', '', '', '', '', ''])

    // 스크롤
    useEffect(() => {
        const handleWheel = (event) => {
            const container = containerRef.current;

            if (container) {
                const delta = event.deltaX || event.deltaY
                container.scrollLeft += delta
                event.preventDefault()
            }
        }

        const container = containerRef.current
        container.addEventListener('wheel', handleWheel)

        return () => {
            container.removeEventListener('wheel', handleWheel)
        }
    }, [])

    // pitcher's report
    useEffect(() => {
        if (pitcherReportRow) {
            const { pitcherNum, k, result, lostScore, pitcherCount } = pitcherReportRow as PitcherReport

            const idx = pitcherNum === 10 ? 0 : (pitcherNum === 11 ? 1 : 2)
            if (pitcherCount) {
                const tempCount = [...ballCount]
                tempCount[idx] = pitcherCount
                setBallCount(tempCount)
            }
            if (k) {
                const tempK = [...kCount]
                tempK[idx] = k
                setKCount(tempK)
            }
            if (['땅볼', '뜬공', '삼진'].includes(result)) {
                const tempOut = [...pitcherOut]
                tempOut[idx] += 1
                const inning = [...pitcherInning]
                const demicalNum = tempOut[idx] - Math.floor(tempOut[idx] / 3) * 3
                if (demicalNum) {
                    inning[idx] = String(Math.floor(tempOut[idx] / 3)) + '.' + String(demicalNum)
                } else {
                    inning[idx] = String(Math.floor(tempOut[idx] / 3))
                }
                setPitcherOut(tempOut)
                setPitcherInning(inning)
            }
            if (lostScore) {
                const tempLost = [...pitcherLost]
                tempLost[idx] = lostScore
                setPitcherLost(tempLost)
            }
        }

    }, [pitcherReportRow])

    // batter's report
    useEffect(() => {
        if (batterReportRow) {
            const { number, result } = batterReportRow as BatterReport
            const tempReport = {...batterReport}
            if (number < 9) {
                tempReport[number].push(result)
                if (tempReport[number][0] === 'null') {
                    tempReport[number] = tempReport[number].slice(1)
                }
                const atBat = tempReport[number].length
                const hit = tempReport[number].filter(bat => ['안타', '2루타', '3루타', '홈런'].includes(bat)).length
                const hr = tempReport[number].filter(bat => ['홈런'].includes(bat)).length
                const bb = tempReport[number].filter(bat => ['볼넷'].includes(bat)).length
                let defaultString = `${atBat - bb}타수 ${hit}안타`

                if (hr) {
                    defaultString += ` ${hr}홈런`
                }
                if (bb) {
                    defaultString += ` ${bb}볼넷`
                }
                const tempBatterTotalReport = [...batterTotalReport]
                tempBatterTotalReport[number] = defaultString

                setBatterReport(tempReport)
                setBatterTotalReport(tempBatterTotalReport)
            }
        }
    }, [batterReportRow])

    return (
        <Report $way={way}>
            <Title>Report</Title>
            <SheetContainer ref={containerRef}>
                <Sheet>
                    <PitcherRow $way={way}>
                        <span>
                        {[...Array(kCount[0])].map((_, index) => (
                            <K key={index}>K</K>
                        ))}
                        </span>
                        <PitcherReport>
                            <PitcherReportCell>{(pitcherInning[0] !== '0' || pitcherLost[0] > 0) && pitcherInning[0] + '이닝'}</PitcherReportCell>
                            <PitcherReportCell>{(pitcherLost[0] > 0 || pitcherInning[0] !== '0') && pitcherLost[0] + '실점'}</PitcherReportCell>
                            {ballCount[0] > 0 && <PitcherReportCell>투구 수: {ballCount[0]}</PitcherReportCell>}
                        </PitcherReport>
                    </PitcherRow>
                    <SheetDiv>
                        {/*<PlayerEl>*/}
                        {/*    <Td style={{border: '0px'}}></Td>*/}
                        {/*</PlayerEl>*/}
                        {batters.map((_, index) => (
                            index < 9 &&
                            <BatterRow $way={way} key={'batterRow' + index}>
                                <BatterLeftSide key={'leftSide' + index}>
                                {
                                batterReport[index].map(cell => {
                                    if (['삼진', '땅볼', '뜬공'].includes(cell)) {
                                        return (<BatterReportCell $hit={'out'}>{cell}</BatterReportCell>)
                                    } else if (['볼넷', '안타', '2루타', '3루타', '홈런'].includes(cell)) {
                                        return (<BatterReportCell $hit={'hit'}>{cell}</BatterReportCell>)
                                    } else {
                                        return (<BatterReportCell $hit={'initial'}>{cell}</BatterReportCell>)
                                    }
                                })
                                }
                                </BatterLeftSide>
                              <PitcherReportCell>{batterTotalReport[index]}</PitcherReportCell>
                            </BatterRow>
                        ))}
                    </SheetDiv>
                    {/*<Pitcher/>*/}
                    <BullpenSheet>
                        {/*    <Pitcher />*/}
                        <PitcherRow $way={way}>
                            <span>
                                {[...Array(kCount[1])].map((_, index) => (
                                    <K key={index}>K</K>
                                ))}
                                {ballCount[1] === 0 && <PitcherReportCell><K value={'null'}>K</K></PitcherReportCell>}
                            </span>
                            <PitcherReport>
                                <PitcherReportCell>{(pitcherInning[1] !== '0' || pitcherLost[1] > 0) && pitcherInning[1] + '이닝'}</PitcherReportCell>
                                <PitcherReportCell>{(pitcherLost[1] > 0 || pitcherInning[1] !== '0') && pitcherLost[1] + '실점'}</PitcherReportCell>
                                {ballCount[1] > 0 && <PitcherReportCell>투구 수: {ballCount[1]}</PitcherReportCell>}
                            </PitcherReport>
                        </PitcherRow>
                        <PitcherRow $way={way}>
                            <span>
                                {[...Array(kCount[2])].map((_, index) => (
                                    <K key={index}>K</K>
                                ))}
                                {ballCount[2] === 0 && <PitcherReportCell><K value={'null'}>K</K></PitcherReportCell>}
                            </span>
                            <PitcherReport>
                                <PitcherReportCell>{ballCount[2] > 0 && pitcherInning[2] + '이닝'}</PitcherReportCell>
                                <PitcherReportCell>{ballCount[2] > 0 && pitcherLost[2] + '실점'}</PitcherReportCell>
                                {ballCount[2] > 0 && <PitcherReportCell>투구 수: {ballCount[2]}</PitcherReportCell>}
                            </PitcherReport>
                        </PitcherRow>
                    </BullpenSheet>
                </Sheet>
            </SheetContainer>
        </Report>
    )
}

export default PlayerReport

const Report = styled.div<styleProps>`
    display:flex;
    flex-direction: column;
    padding: 0px 30px 40px 30px;
    //width: fit-content;
    color: black;
    background-color: white;
    z-index: 1;
    filter: ${props => {
        if (props.$way === 'home') {
            return 'drop-shadow(4px 3px 5px grey)'
        } else {
            return 'drop-shadow(-4px 3px 5px grey)'
        }
    }};
    @media (max-width: 821px) {
        display: none;
    }
`

const Title = styled.div`
    font-family: "IBM Plex Serif", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 25px;
    padding: 15px 0px 15px 0px;
    height: 85.5px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`

const SheetContainer = styled.div<styleProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 14px;
    max-width: 386px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-track {
        background: white;
    }
    &::-webkit-scrollbar-thumb {
        background: #e9e9e9;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-button {
        display: none;
    }
`

const Sheet = styled.div`
    display: grid;
    grid-template-rows: 1fr 9fr 2fr;
    justify-content: center;
    border: 2px solid transparent;
    border-radius: 3px;
    margin-top: 39px;
`

const SheetDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 19px;
    border: 1px solid transparent;
    max-height: 367px;
    margin-top: 36px;
`

const BatterRow = styled.span<styleProps>`
    display: flex;
    flex-direction: ${props => {
        if (props.$way === 'away') {
            return 'row-reverse';
        }
    }};
    gap: 50px;
    align-items: center;
    justify-content: space-between;
    font-size: 27px;
    font-family: "Nanum Pen Script", cursive;
    font-weight: 400;
    font-style: normal;
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
`

const BatterLeftSide = styled.span`
    display: flex;
    //gap: 3px;
`

const PitcherRow = styled.span<styleProps>`
    display: flex;
    gap: 50px;
    justify-content: space-between;
    align-items: center;
    font-size: 27px;
    font-family: "Nanum Pen Script", cursive;
    font-weight: 400;
    font-style: normal;
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;
    min-height: 49px;
    flex-direction: ${props => {
        if (props.$way === 'away') {
            return 'row-reverse';
        }
    }};
    padding-left: ${props => {
        if (props.$way === 'home') {
            return '8px';
        }
    }};
    padding-right: ${props => {
        if (props.$way === 'away') {
            return '8px';
        }
    }};
`

const PitcherReport = styled.span`
    display: flex;
    gap: 5px;
`

const PitcherReportCell = styled.span`
    display: flex;
    font-size: 18px;
    font-family: "Nanum Pen Script", cursive;
    font-weight: 400;
    font-style: normal;
    margin-right: 3px;
    white-space: nowrap;
`

const K = styled.span<styleProps>`
    font-family: "Protest Revolution", sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #D12600;
    margin-right: 3px;
    visibility: ${props => {
        if (props.value === 'null') {
            return 'hidden';
        }
    }};
`

const BatterReportCell = styled.span<styleProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 30px;
    font-size: 18px;
    font-family: "Hahmlet", serif;
    font-optical-sizing: auto;
    font-style: normal;
    color: ${props => {
        if (props.$hit === 'hit') {
            return '#2C8BA8';
        }
    }};
    visibility: ${props => {
        if (props.$hit === 'initial') {
            return 'hidden';
        }
    }};
`

const BullpenSheet = styled.div`
    border: 2px solid transparent;
    //margin-top: 3%;
    //margin-top: 2.5%;
`