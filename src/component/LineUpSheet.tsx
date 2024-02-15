// @ts-ignore
import React, { useEffect, useState, DetailedHTMLProps, HTMLAttributes } from 'react'
import styled from 'styled-components'
import './LineUpSheet.css'

interface PropsType {
    awayTeam: string
    homeTeam: string
    homeLineUp: Array<LineUp | null>
    awayLineUp: Array<LineUp | null>
    onPlay: boolean
}

interface LineUp {
    name: string
    position: string
    avg: number
    year: string
}

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    namelength: number
}

const LineUpSheet = (props: PropsType) => {
    const { awayTeam, homeTeam, awayLineUp, homeLineUp, onPlay } = props
    // const [startingPitcher, setStartingPitcher] = useState()
    const [awayVisibleNames, setAwayVisibleNames] = useState(Array.from({length: 21 }, () => ''))
    const [homeVisibleNames, setHomeVisibleNames] = useState(Array.from({length: 21 }, () => ''))
    
    const arrayFromName = (name) => {
        return [...name]
    }
    const characterSpanByName = (name) => Array.from({ length: arrayFromName(name).length}, (_, i) => (
        <CursiveText>{arrayFromName(name)[i]}</CursiveText>
    ))

    useEffect(() => {
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
            <Title>LINE-UP CARD</Title>
            <SheetContainer className={onPlay ? 'sheetActive' : 'sheet'}>
                <div key='away_sheet'>
                <Sheet>
                    <SheetDiv key='away_team_name' style={{borderBottom: '0px'}}>{awayTeam ? awayTeam : 'Away'}</SheetDiv>
                    <Pitcher>선발투수 : <div style={{display: 'flex', gap: '15px'}}><CursiveText>{awayVisibleNames[0]}</CursiveText></div></Pitcher>
                    <SheetDiv>
                        <PlayerEl key='away_title'>
                            <Td>타순</Td>
                            <Td>위치</Td>
                            <Td style={{borderRight: '0px'}}>선수명</Td>
                        </PlayerEl>
                        {awayLineUp.map((_, index) => (
                            index < 9 ? 
                            <PlayerEl key={'away_sheet' + index}>
                                <Td style={{ borderBottom: index === 8 ? '0px' : '1px solid black' }}>{index + 1}</Td>
                                <CursiveTd style={{ borderBottom: index === 8 ? '0px' : '1px solid black' }}>{awayVisibleNames[index * 2 + 1]}</CursiveTd>
                                <CursiveTd style={{ borderBottom: index === 8 ? '0px' : '1px solid black', borderRight: '0px' }}>
                                    <LetterSpacedByLength namelength={awayLineUp[index].name.length}>{awayVisibleNames[index * 2 + 2]}</LetterSpacedByLength>
                                </CursiveTd>
                            </PlayerEl>
                            : <></>
                        ))}
                        {/* { awayPlayerList } */}
                    </SheetDiv>
                </Sheet>
                <BullpenSheet>
                    <Pitcher>대기투수</Pitcher>
                    <Pitcher><CursiveText><div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(awayVisibleNames[19])}</div></CursiveText></Pitcher>
                    <Pitcher><CursiveText><div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(awayVisibleNames[20])}</div></CursiveText></Pitcher>
                </BullpenSheet>
                </div>
                <div key='home_sheet'>
                <Sheet>
                    <SheetDiv key='home_team_name' style={{borderBottom: '0px'}}>{homeTeam ? homeTeam : 'Home'}</SheetDiv>
                    <Pitcher>선발투수 : <div style={{display: 'flex', gap: '15px'}}><CursiveText>{homeVisibleNames[0]}</CursiveText></div></Pitcher>
                    <SheetDiv>
                        <PlayerEl key='home_title'>
                            <Td>타순</Td>
                            <Td>위치</Td>
                            <Td style={{borderRight: '0px'}}>선수명</Td>
                        </PlayerEl>
                        {homeLineUp.map((_, index) => (
                            index < 9 ? 
                            <PlayerEl key={'home_sheet' + index}>
                                <Td style={{ borderBottom: index === 8 ? '0px' : '1px solid black' }}>{index + 1}</Td>
                                <CursiveTd style={{ borderBottom: index === 8 ? '0px' : '1px solid black' }}>{homeVisibleNames[index * 2 + 1]}</CursiveTd>
                                <CursiveTd style={{ borderBottom: index === 8 ? '0px' : '1px solid black', borderRight: '0px' }}>
                                    <LetterSpacedByLength namelength={homeLineUp[index].name.length}>{homeVisibleNames[index * 2 + 2]}</LetterSpacedByLength>
                                </CursiveTd>
                            </PlayerEl>
                            : <></>
                        ))}
                        {/* { homePlayerList } */}
                    </SheetDiv>
                </Sheet>
                <BullpenSheet>
                    <Pitcher>대기투수</Pitcher>
                    <Pitcher><CursiveText><div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(homeVisibleNames[19])}</div></CursiveText></Pitcher>
                    <Pitcher><CursiveText><div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(homeVisibleNames[20])}</div></CursiveText></Pitcher>
                </BullpenSheet>
                </div>
            </SheetContainer>
            </CardBorder>
        </>
    )
}

export default LineUpSheet


const CardBorder = styled.div`
    display:flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 3px;
    padding: 0px 10px 40px 10px;
    width: fit-content;
    background-color: white;
    color: black;
`

const Title = styled.div`
    font-family: "IBM Plex Serif", serif;
    font-weight: 400;
    font-style: normal;
    font-size: 37px;
    padding: 15px 0px 15px 0px;
`

const SheetContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`

const Sheet = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 10fr;
    width: 270px;
    border: 2px solid black;
    border-radius: 3px;
`

const SheetDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 19px;
    border: 1px solid black;
`

const PlayerEl = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 4fr;
    height: 100%;
`

const Td = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 19px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
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
`

const LetterSpacedByLength = styled.span<styleProps>`
    position: relative;
    left: ${props => {
        if (props.namelength < 4) {
            return '18px'
        } else {
            return '8px'
        }
    }};
    font-family: "Nanum Pen Script", cursive;
    font-weight: 400;
    font-style: normal;
    letter-spacing: ${props => {
        if (props.namelength < 4) {
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
`

const Pitcher = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    border: 1px solid black;
    border-bottom: 0px;
    min-height: 41px;
`

const BullpenSheet = styled.div`
    margin-top: 15px;
    border: 2px solid black;
    border-bottom: 3px solid black;
`