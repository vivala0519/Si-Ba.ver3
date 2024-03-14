import React, { useEffect, useState, DetailedHTMLProps, HTMLAttributes } from 'react'
import styled from 'styled-components'
import './LineUpCard.css'

interface PropsType {
    awayTeam: string
    homeTeam: string
    homeLineUp: Array<LineUp | null>
    awayLineUp: Array<LineUp | null>
    onPlay: boolean
    setShowScoreBoard: React.Dispatch<React.SetStateAction<boolean>>
    gameReportRow: object
    isMobile: boolean
    homeMobileReport: object
    awayMobileReport: object
}

interface LineUp {
    name: string
    position: string
    avg: number
    year: string
}

interface GameReportRow {
    topBottom?: string
    number?: number
    changed: boolean
    pitcherCount: number
    k: number
}

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    $namelength?: number
    $isActive?: boolean
    $ballCount?: number
    $isMobile?: boolean
    $index?: number
    $way?: string
    $hit?: string
    $reportMode?: boolean
}

const LineUpCard = (props: PropsType) => {
    const { awayTeam, homeTeam, awayLineUp, homeLineUp, onPlay, setShowScoreBoard, gameReportRow, homeMobileReport, awayMobileReport } = props
    // display names for texting animation
    const [awayVisibleNames, setAwayVisibleNames] = useState(Array.from({length: 21 }, () => ''))
    const [homeVisibleNames, setHomeVisibleNames] = useState(Array.from({length: 21 }, () => ''))
    // active player
    const [activeTopBottom, setActiveTopBottom] = useState('top')
    const [activeBatter, setActiveBatter] = useState(0)
    const [activeHomePitcher, setActiveHomePitcher] = useState(10)
    const [activeAwayPitcher, setActiveAwayPitcher] = useState(10)
    const [homePitcherCount, setHomePitcherCount] = useState(0)
    const [awayPitcherCount, setAwayPitcherCount] = useState(0)
    // report mode for mobile
    const [reportMode, setReportMode] = useState(false)
    
    const arrayFromName = (name) => {
        return [...name]
    }
    const characterSpanByName = (name) => Array.from({ length: arrayFromName(name).length}, (_, i) => (
        <CursiveText>{arrayFromName(name)[i]}</CursiveText>
    ))

    useEffect(() => {
        // 라인업 텍스팅 완료되면 스코어보드 show
        if (homeVisibleNames[20].length === homeLineUp[12].name.length) {
            setShowScoreBoard(true)
        }
        // visibleNames 위한 데이터 정제
        const adjustedNameList = [awayLineUp[10].name]
        for (let i = 0; i < 13; i++) {
            if (i < 9) {
                adjustedNameList.push(awayLineUp[i].position)
                adjustedNameList.push(awayLineUp[i].name)
            } else if (i > 10 && i < 13) {
                adjustedNameList.push(awayLineUp[i].name)
            }
        }

        const isLineUpSheetOn = awayVisibleNames[0].length === 0 ? true :  false
        
        const timeout = setTimeout(() => {
            setAwayVisibleNames(prevVisibleNames => {
                const nextIndex = prevVisibleNames.findIndex(name => name.length < adjustedNameList[prevVisibleNames.indexOf(name)].length);
                
                if (nextIndex !== -1) {
                    const newVisibleNames = [...prevVisibleNames];
                    newVisibleNames[nextIndex] = adjustedNameList[nextIndex].slice(0, newVisibleNames[nextIndex].length + 1);
                    return newVisibleNames;
                } else {
                    clearTimeout(timeout);
                    return prevVisibleNames;
                }
            });
        }, isLineUpSheetOn ? 1200 : 50); // 각 글자를 출력하는 딜레이 시간

        return () => clearTimeout(timeout);
    }, [awayVisibleNames, awayLineUp]);

    
    useEffect(() => {
        const adjustedNameList = [homeLineUp[10].name]
        for (let i = 0; i < 13; i++) {
            if (i < 9) {
                adjustedNameList.push(homeLineUp[i].position)
                adjustedNameList.push(homeLineUp[i].name)
            } else if (i > 10 && i < 13) {
                adjustedNameList.push(homeLineUp[i].name)
            }
        }

        const isLineUpSheetOn = homeVisibleNames[0].length === 0 ? true :  false
        
        const timeout = setTimeout(() => {
            setHomeVisibleNames(prevVisibleNames => {
                const nextIndex = prevVisibleNames.findIndex(name => name.length < adjustedNameList[prevVisibleNames.indexOf(name)].length);
                
                if (nextIndex !== -1) {
                    const newVisibleNames = [...prevVisibleNames];
                    newVisibleNames[nextIndex] = adjustedNameList[nextIndex].slice(0, newVisibleNames[nextIndex].length + 1);
                    return newVisibleNames;
                } else {
                    clearTimeout(timeout);
                    return prevVisibleNames;
                }
            });
        }, isLineUpSheetOn ? 1200 : 50);

        return () => clearTimeout(timeout);
    }, [homeVisibleNames, homeLineUp]);

    useEffect(() => {
        if (gameReportRow) {
            const { topBottom, number, changed, pitcherCount } = gameReportRow as GameReportRow
            setActiveTopBottom(topBottom)
            if (number !== undefined) {
                if (number < 10) {
                    setActiveBatter(number)
                }
            }
            if (pitcherCount) {
                topBottom === 'top' ? setHomePitcherCount(pitcherCount) : setAwayPitcherCount(pitcherCount)
            }
            if (changed) {
                if (topBottom === 'top') {
                    setActiveHomePitcher(number)
                } else {
                    setActiveAwayPitcher(number)
                }
            }
        }
    }, [gameReportRow])

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 820) {
                setReportMode(false)
            }
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // const awayPlayerList = Array.from({ length: 9 }, (_, i) => (
    //     <>
    //         {i !== 9 ?
    //             <PlayerEl key={i}>
    //                 <Td style={{borderBottom: i === 8 ? '0px' : '1px solid black'}}>{i + 1}</Td>
    //                 <CursiveTd style={{borderBottom: i === 8 ? '0px' : '1px solid black'}}>{awayLineUp[i].position}</CursiveTd>
    //                 <CursiveTd style={{borderBottom: i === 8 ? '0px' : '1px solid black', borderRight: '0px'}}>
    //                     <LetterSpacedByLength nameLength={awayNameList[i].length}>{awayNameList[i]}</LetterSpacedByLength>
    //                 </CursiveTd>
    //             </PlayerEl>
    //             :
    //             <></>
    //         }
    //     </>
    // ));
    
    // const homePlayerList = Array.from({ length: 9 }, (_, i) => (
    //     <>
    //         {i !== 9 ? 
    //             <PlayerEl key={i}>
    //                 <Td style={{borderBottom: i === 8 ? '0px' : '1px solid black'}}>{i + 1}</Td>
    //                 <CursiveTd style={{borderBottom: i === 8 ? '0px' : '1px solid black'}}>{homeLineUp[i].position}</CursiveTd>
    //                 <CursiveTd style={{borderBottom: i === 8 ? '0px' : '1px solid black', borderRight: '0px'}}>
    //                     {/* <div style={{display: 'flex', gap: '15px'}}>
    //                         {characterSpanByName(homeLineUp[i].name)}
    //                     </div> */}
    //                     <LetterSpacedByLength nameLength={homeLineUp[i].name.length}>{homeLineUp[i].name}</LetterSpacedByLength>
    //                 </CursiveTd>
    //             </PlayerEl>
    //             :
    //             <></>
    //         }
    //     </>
    // ));

    return (
        <>
            <CardBorder className={onPlay ? 'sheetBorder' : ''}>
            <Title>{reportMode ? 'RECORD' : 'LINE-UP CARD'}</Title>
            <SheetContainer className={onPlay ? 'sheetActive' : 'sheet'} onClick={() => (window.innerWidth < 812) && setReportMode(!reportMode)} $isMobile={window.innerWidth < 812}>
                <div key='away_sheet' style={{width: '100%'}}>
                <Sheet>
                    <SheetDiv key='away_team_name' style={{borderBottom: '0px'}}>{awayTeam ? awayTeam : 'Away'}</SheetDiv>
                    {!reportMode ?
                        <StarterPitcher $isActive={activeTopBottom === 'bottom' && activeAwayPitcher === 10} $ballCount={awayPitcherCount}>
                        선발투수 : <CursiveText>
                                    <div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(awayVisibleNames[0])}</div>
                                 </CursiveText>
                        </StarterPitcher>
                        :
                        <PitcherRecord $way='away'>
                            <span>
                                {[...Array(awayMobileReport['kCount'][0])]?.map((_, index) => (
                                    <K key={index}>K</K>
                                ))}
                            </span>
                            <PitcherReport>
                                <PitcherReportCell>{(awayMobileReport['pitcherInning'][0] !== '0' || awayMobileReport['pitcherLost'][0] > 0) && awayMobileReport['pitcherInning'][0] + '이닝'}</PitcherReportCell>
                                <PitcherReportCell>{(awayMobileReport['pitcherLost'][0] > 0 || awayMobileReport['pitcherInning'][0] !== '0') && awayMobileReport['pitcherLost'][0] + '실점'}</PitcherReportCell>
                                {awayMobileReport['ballCount'][0] > 0 && <PitcherReportCell>투구 수: {awayMobileReport['ballCount'][0]}</PitcherReportCell>}
                            </PitcherReport>
                        </PitcherRecord>
                    }
                    <SheetDiv $reportMode={reportMode}>
                        {!reportMode ?
                            <PlayerEl key='away_title'>
                                <Td>타순</Td>
                                <Td>위치</Td>
                                <Td style={{borderRight: '0'}}>선수명</Td>
                            </PlayerEl>
                            :
                            <PlayerElRecord style={{justifyContent: 'center', borderBottom: '1px solid black'}}>
                                타석 기록 / 전체 타석
                            </PlayerElRecord>
                        }
                        {awayLineUp.map((_, index) => (
                            index < 9 ?
                                !reportMode ?
                                    <PlayerEl key={'away_sheet' + index} className={activeTopBottom === 'top' && activeBatter === index ? 'activePlayer' : ''}>
                                        <Td style={{ borderBottom: index === 8 ? '0px' : '1px solid black' }}>{index + 1}</Td>
                                        <CursiveTd style={{ borderBottom: index === 8 ? '0px' : '1px solid black' }}>{awayVisibleNames[index * 2 + 1]}</CursiveTd>
                                        <CursiveTd style={{ borderBottom: index === 8 ? '0px' : '1px solid black', borderRight: '0' }}>
                                            <LetterSpacedByLength $namelength={awayLineUp[index].name.length}>{awayVisibleNames[index * 2 + 2]}</LetterSpacedByLength>
                                        </CursiveTd>
                                    </PlayerEl>
                                    :
                                    <PlayerElRecord $index={index} $way='away'>
                                        <BatterLeftSide key={'awayLeftSide' + index}>
                                            {
                                                awayMobileReport['batterReport'][index]?.map(cell => {
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
                                        <PitcherReportCell>{awayMobileReport['batterTotalReport'][index]}</PitcherReportCell>
                                    </PlayerElRecord>
                            : <></>
                        ))}
                        {/* { awayPlayerList } */}
                    </SheetDiv>
                </Sheet>
                <BullpenSheet>
                    <Pitcher>대기투수</Pitcher>
                    {!reportMode ?
                        <Pitcher $isActive={activeTopBottom === 'bottom' && activeAwayPitcher === 11} $ballCount={awayPitcherCount}>
                            <CursiveText>
                                <div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(awayVisibleNames[19])}</div>
                            </CursiveText>
                        </Pitcher>
                        :
                        <PitcherRecord $way='away'>
                            <span>
                                {[...Array(awayMobileReport['kCount'][1])]?.map((_, index) => (
                                    <K key={index}>K</K>
                                ))}
                            </span>
                            <PitcherReport>
                                <PitcherReportCell>{(awayMobileReport['pitcherInning'][1] !== '0' || awayMobileReport['pitcherLost'][1] > 0) && awayMobileReport['pitcherInning'][1] + '이닝'}</PitcherReportCell>
                                <PitcherReportCell>{(awayMobileReport['pitcherLost'][1] > 0 || awayMobileReport['pitcherInning'][1] !== '0') && awayMobileReport['pitcherLost'][1] + '실점'}</PitcherReportCell>
                                {awayMobileReport['ballCount'][1] > 0 && <PitcherReportCell>투구 수: {awayMobileReport['ballCount'][1]}</PitcherReportCell>}
                            </PitcherReport>
                        </PitcherRecord>
                    }
                    {!reportMode ?
                        <Pitcher $isActive={activeTopBottom === 'bottom' && activeAwayPitcher === 12} $ballCount={awayPitcherCount}>
                            <CursiveText>
                                <div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(awayVisibleNames[20])}</div>
                            </CursiveText>
                        </Pitcher>
                        :
                        <PitcherRecord $way='away'>
                            <span>
                                {[...Array(awayMobileReport['kCount'][2])]?.map((_, index) => (
                                    <K key={index}>K</K>
                                ))}
                            </span>
                            <PitcherReport>
                                <PitcherReportCell>{(awayMobileReport['pitcherInning'][2] !== '0' || awayMobileReport['pitcherLost'][2] > 0) && awayMobileReport['pitcherInning'][2] + '이닝'}</PitcherReportCell>
                                <PitcherReportCell>{(awayMobileReport['pitcherLost'][2] > 0 || awayMobileReport['pitcherInning'][2] !== '0') && awayMobileReport['pitcherLost'][2] + '실점'}</PitcherReportCell>
                                {awayMobileReport['ballCount'][2] > 0 && <PitcherReportCell>투구 수: {awayMobileReport['ballCount'][2]}</PitcherReportCell>}
                            </PitcherReport>
                        </PitcherRecord>
                    }
                </BullpenSheet>
                </div>
                <div key='home_sheet' style={{width: '100%'}}>
                <Sheet>
                    <SheetDiv key='home_team_name' style={{borderBottom: '0px'}}>{homeTeam ? homeTeam : 'Home'}</SheetDiv>
                    {!reportMode ?
                        <StarterPitcher $isActive={activeTopBottom === 'top' && activeHomePitcher === 10} $ballCount={homePitcherCount}>
                            선발투수 : <CursiveText><div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(homeVisibleNames[0])}</div></CursiveText>
                        </StarterPitcher>
                        :
                        <PitcherRecord $way='home'>
                            <span>
                                {[...Array(homeMobileReport['kCount'][0])]?.map((_, index) => (
                                    <K key={index}>K</K>
                                ))}
                            </span>
                            <PitcherReport>
                                <PitcherReportCell>{(homeMobileReport['pitcherInning'][0] !== '0' || homeMobileReport['pitcherLost'][0] > 0) && homeMobileReport['pitcherInning'][0] + '이닝'}</PitcherReportCell>
                                <PitcherReportCell>{(homeMobileReport['pitcherLost'][0] > 0 || homeMobileReport['pitcherInning'][0] !== '0') && homeMobileReport['pitcherLost'][0] + '실점'}</PitcherReportCell>
                                {homeMobileReport['ballCount'][0] > 0 && <PitcherReportCell>투구 수: {homeMobileReport['ballCount'][0]}</PitcherReportCell>}
                            </PitcherReport>
                        </PitcherRecord>
                    }
                    <SheetDiv $reportMode={reportMode}>
                        {!reportMode ?
                            <PlayerEl key='home_title'>
                                <Td>타순</Td>
                                <Td>위치</Td>
                                <Td style={{borderRight: '0'}}>선수명</Td>
                            </PlayerEl>
                            :
                            <PlayerElRecord style={{justifyContent: 'center', borderBottom: '1px solid black'}}>
                                타석 기록 / 전체 타석
                            </PlayerElRecord>
                        }
                        {homeLineUp.map((_, index) => (
                            index < 9 ?
                                !reportMode ?
                                    <PlayerEl key={'home_sheet' + index} className={activeTopBottom === 'bottom' && activeBatter === index ? 'activePlayer' : ''}>
                                        <Td style={{ borderBottom: index === 8 ? '0px' : '1px solid black' }}>{index + 1}</Td>
                                        <CursiveTd style={{ borderBottom: index === 8 ? '0px' : '1px solid black' }}>{homeVisibleNames[index * 2 + 1]}</CursiveTd>
                                        <CursiveTd style={{ borderBottom: index === 8 ? '0px' : '1px solid black', borderRight: '0' }}>
                                            <LetterSpacedByLength $namelength={homeLineUp[index].name.length}>{homeVisibleNames[index * 2 + 2]}</LetterSpacedByLength>
                                        </CursiveTd>
                                    </PlayerEl>
                                    :
                                    <PlayerElRecord $index={index} $way='home'>
                                        <BatterLeftSide key={'homeLeftSide' + index}>
                                            {
                                                homeMobileReport['batterReport'][index]?.map(cell => {
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
                                        <PitcherReportCell>{homeMobileReport['batterTotalReport'][index]}</PitcherReportCell>
                                    </PlayerElRecord>
                            : <></>
                        ))}
                        {/* { homePlayerList } */}
                    </SheetDiv>
                </Sheet>
                <BullpenSheet>
                    <Pitcher>대기투수</Pitcher>
                    {!reportMode ?
                        <Pitcher $isActive={activeTopBottom === 'top' && activeHomePitcher === 11} $ballCount={homePitcherCount}>
                            <CursiveText><div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(homeVisibleNames[19])}</div></CursiveText>
                        </Pitcher>
                        :
                        <PitcherRecord $way='home'>
                            <span>
                                {[...Array(homeMobileReport['kCount'][1])]?.map((_, index) => (
                                    <K key={index}>K</K>
                                ))}
                            </span>
                            <PitcherReport>
                                <PitcherReportCell>{(homeMobileReport['pitcherInning'][1] !== '0' || homeMobileReport['pitcherLost'][1] > 0) && homeMobileReport['pitcherInning'][1] + '이닝'}</PitcherReportCell>
                                <PitcherReportCell>{(homeMobileReport['pitcherLost'][1] > 0 || homeMobileReport['pitcherInning'][1] !== '0') && homeMobileReport['pitcherLost'][1] + '실점'}</PitcherReportCell>
                                {homeMobileReport['ballCount'][1] > 0 && <PitcherReportCell>투구 수: {homeMobileReport['ballCount'][1]}</PitcherReportCell>}
                            </PitcherReport>
                        </PitcherRecord>
                    }
                    {!reportMode ?
                        <Pitcher $isActive={activeTopBottom === 'top' && activeHomePitcher === 12} $ballCount={homePitcherCount}>
                            <CursiveText><div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(homeVisibleNames[20])}</div></CursiveText>
                        </Pitcher>
                        :
                        <PitcherRecord $way='home'>
                            <span>
                                {[...Array(homeMobileReport['kCount'][2])]?.map((_, index) => (
                                    <K key={index}>K</K>
                                ))}
                            </span>
                            <PitcherReport>
                                <PitcherReportCell>{(homeMobileReport['pitcherInning'][2] !== '0' || homeMobileReport['pitcherLost'][2] > 0) && homeMobileReport['pitcherInning'][2] + '이닝'}</PitcherReportCell>
                                <PitcherReportCell>{(homeMobileReport['pitcherLost'][2] > 0 || homeMobileReport['pitcherInning'][2] !== '0') && homeMobileReport['pitcherLost'][2] + '실점'}</PitcherReportCell>
                                {homeMobileReport['ballCount'][2] > 0 && <PitcherReportCell>투구 수: {homeMobileReport['ballCount'][2]}</PitcherReportCell>}
                            </PitcherReport>
                        </PitcherRecord>
                    }
                </BullpenSheet>
                </div>
            </SheetContainer>
            </CardBorder>
        </>
    )
}

export default LineUpCard

const CardBorder = styled.div`
    display:flex;
    flex-direction: column;
    padding: 0px 10px 40px 10px;
    //width: fit-content;
    color: black;
    background-color: white;
    filter: drop-shadow(0px 7px 37px black);
    @media (max-width: 821px) {
        //position: absolute;
        //top: 24%;
        //left: 3%;
        width: 100%;
        //z-index: 1000;
        padding: 0px 10px 10px 10px;
    };
    //@media (max-width: 376px) {
    //    position: absolute;
    //    top: 30%;
    //};
    //--borderWidth: 3px;
    //position: relative;
    //border-radius: var(--borderWidth);
    //z-index: revert;
    
    //&::after {
    //    content: '';
    //    position: absolute;
    //    top: calc(-1 * var(--borderWidth));
    //    left: calc(-1 * var(--borderWidth));
    //    height: calc(100% + var(--borderWidth) * 2);
    //    width: calc(100% + var(--borderWidth) * 2);
    //    background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
    //    border-radius: calc(2 * var(--borderWidth));
    //    z-index: -1;
    //    animation: animatedgradient 3s ease alternate infinite;
    //    background-size: 300% 300%;
    //    filter: blur(45px);
    //}
`

const Title = styled.div`
    font-family: "IBM Plex Serif", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 37px;
    padding: 15px 0px 15px 0px;
    @media (max-width: 821px) {
        font-size: 27px;
    };
`

const SheetContainer = styled.div<styleProps>`
    display: flex;
    justify-content: center;
    gap: 10px;
    cursor: ${props => props.$isMobile && 'pointer'};
    @media (max-width: 821px) {
        cursor: pointer;
    };
`

const Sheet = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 10fr;
    //width: 270px;
    width: 100%;
    border: 2px solid black;
    border-radius: 3px;

    @media (max-width: 821px) {
        height: 70%;
    };

    &::-webkit-scrollbar {
        height: 1px;
        display: none;
    }
`

const SheetDiv = styled.div<styleProps>`
    display: ${props => props.$reportMode ? 'grid' : 'flex'};
    flex-direction: column;
    justify-content: ${props => props.$reportMode ? 'none' : 'space-around'};
    font-size: 18px;
    border: 1px solid black;
    font-family: "Hahmlet", serif;
    font-optical-sizing: auto;
    font-style: normal;
    @media (max-width: 821px) {
        width: 100%;
        font-size: 13px;
    };
`

const PlayerEl = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 4fr;
    height: 100%;
`

const PlayerElRecord = styled.div<styleProps>`
    display: flex;
    flex-direction: ${props => {
        if (props.$way === 'away') {
            return 'row-reverse';
        }
    }};
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    min-width: 100%;
    width: 100%;
    height: 100%;
    padding-left: 5px;
    padding-right: 5px;
    font-family: "Nanum Pen Script", cursive;
    font-weight: 400;
    font-size: 13px;
    font-style: normal;
    border-bottom: ${props => props.$index < 8 && '1px solid black'};
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        height: 1px;
        display: none;
    }
`

const PitcherRecord = styled.div<styleProps>`
    width: 100%;
    min-height: 30px;
    border: 1px solid black;
    border-bottom: 0;
    display: flex;
    gap: 50px;
    justify-content: space-between;
    align-items: center;
    font-family: "Nanum Pen Script", cursive;
    font-weight: 400;
    font-style: normal;
    flex-direction: ${props => {
        if (props.$way === 'away') {
            return 'row-reverse';
        }
    }};
    padding-left: 5px;
    padding-right: 5px;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        height: 1px;
        display: none;
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

const K = styled.span`
    font-family: "Protest Revolution", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #D12600;
`

const PitcherReport = styled.span`
    display: flex;
    gap: 5px;
`

const PitcherReportCell = styled.span`
    display: flex;
    font-family: "Nanum Pen Script", cursive;
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    white-space: pre;
`

const BatterLeftSide = styled.span`
    display: flex;
    gap: 2px;
`

const BatterReportCell = styled.span<styleProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: pre;
    font-family: "Hahmlet", serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 10px;
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

const Td = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    font-family: "Hahmlet", serif;
    font-optical-sizing: auto;
    font-style: normal;
    @media (max-width: 821px) {
        font-size: 10px;
    };
`

const CursiveTd = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 27px;
    font-family: "Nanum Pen Script", cursive;
    font-weight: 400;
    font-style: normal;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    @media (max-width: 821px) {
        font-size: 15px;
    };
`

const LetterSpacedByLength = styled.span<styleProps>`
    position: relative;
    left: ${props => {
        if (props.$namelength < 4) {
            return '9%'
        } else {
            return '5%'
        }
    }};
    font-family: "Nanum Pen Script", cursive;
    font-weight: 400;
    font-style: normal;
    letter-spacing: ${props => {
        if (props.$namelength < 4) {
            return '1.3em'
        } else {
            return '0.6em'
        }
    }}
`

const CursiveText = styled.span`
    font-size: 27px;
    font-family: "Nanum Pen Script", cursive;
    font-weight: 400;
    font-style: normal;
    @media (max-width: 821px) {
        font-size: 15px;
    };
`

const StarterPitcher = styled.div<styleProps>`
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding-left: 9px;
    font-size: 18px;
    border: 1px solid black;
    border-bottom: 0px;
    min-height: 30px;
    justify-items: center;
    align-items: center;
    font-family: "Hahmlet", serif;
    font-optical-sizing: auto;
    font-style: normal;
    background-color: ${props => {
        if (props.$isActive) {
            const ballCount = props.$ballCount
            if (ballCount <= 20) {
                return '#ebff0b !important';        
            } else if (ballCount <= 40) {
                return '#d9cb53 !important';
            } else if (ballCount <= 60) {
                return '#d9b553 !important';
            } else if (ballCount <= 80) {
                return '#d9a653 !important';
            } else {
                return '#d95e53 !important';
            }
        }
    }};
    @media (max-width: 821px) {
        font-size: 10px;
        min-height: 30px;
        padding: 0 5px 0 5px;
    };
`
const Pitcher = styled.div<styleProps>`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    border: 1px solid black;
    border-bottom: 0px;
    min-height: 41px;
    font-family: "Hahmlet", serif;
    font-optical-sizing: auto;
    font-style: normal;
    background-color: ${props => {
        if (props.$isActive) {
            const ballCount = props.$ballCount
            if (ballCount <= 20) {
                return '#ebff0b !important';
            } else if (ballCount <= 40) {
                return '#d9cb53 !important';
            } else if (ballCount <= 60) {
                return '#d9b553 !important';
            } else if (ballCount <= 80) {
                return '#d9a653 !important';
            } else {
                return '#d95e53 !important';
            }
        }
    }};
    @media (max-width: 821px) {
        font-size: 13px;
        min-height: 30px;
    };
`

const BullpenSheet = styled.div`
    display: grid;
    //flex-direction: column;
    width: 100%;
    margin-top: 15px;
    border: 2px solid black;
    border-bottom: 3px solid black;
`