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
    nameLength: number
}

const LineUpSheet = (props: PropsType) => {
    const { awayTeam, homeTeam, awayLineUp, homeLineUp, onPlay } = props
    const [startingPitcher, setStartingPitcher] = useState([])
    const [visibleNames, setVisibleNames] = useState(Array.from({length: 9 }, () => ''))
    // const [awayNameList, setAwayNameList] = useState(['', '', '', '', '', '', '', '', ''])
    
    // console.log(awayPlayersNameList);
    
    const arrayFromName = (name) => {
        return [...name]
    }
    const characterSpanByName = (name) => Array.from({ length: arrayFromName(name).length}, (_, i) => (
        <CursiveText>{arrayFromName(name)[i]}</CursiveText>
    ))

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStartingPitcher(prevStarter => {
                const nextIndex = arrayFromName(prevStarter).findIndex(name => name.length < awayLineUp[10].name.length);
                
                if (nextIndex !== -1) {
                    const newVisibleNames = [...prevStarter];
                    newVisibleNames[nextIndex] = awayLineUp[nextIndex].name.slice(0, newVisibleNames[nextIndex].length + 1);
                    console.log(newVisibleNames[nextIndex]);
                    
                    return newVisibleNames;
                } else {
                    clearTimeout(timeout);
                    return prevStarter;
                }
            })
        }, 100)
    }, [startingPitcher, awayLineUp])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisibleNames(prevVisibleNames => {
                const nextIndex = prevVisibleNames.findIndex(name => name.length < awayLineUp[prevVisibleNames.indexOf(name)].name.length);
                
                if (nextIndex !== -1) {
                    const newVisibleNames = [...prevVisibleNames];
                    newVisibleNames[nextIndex] = awayLineUp[nextIndex].name.slice(0, newVisibleNames[nextIndex].length + 1);
                    return newVisibleNames;
                } else {
                    clearTimeout(timeout);
                    return prevVisibleNames;
                }
            });
        }, 100); // 각 글자를 출력하는 딜레이 시간 (밀리초)

        return () => clearTimeout(timeout);
    }, [visibleNames, awayLineUp]);
    
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
    
    const homePlayerList = Array.from({ length: 9 }, (_, i) => (
        <>
            {i !== 9 ? 
                <PlayerEl key={i}>
                    <Td style={{borderBottom: i === 8 ? '0px' : '1px solid black'}}>{i + 1}</Td>
                    <CursiveTd style={{borderBottom: i === 8 ? '0px' : '1px solid black'}}>{homeLineUp[i].position}</CursiveTd>
                    <CursiveTd style={{borderBottom: i === 8 ? '0px' : '1px solid black', borderRight: '0px'}}>
                        {/* <div style={{display: 'flex', gap: '15px'}}>
                            {characterSpanByName(homeLineUp[i].name)}
                        </div> */}
                        <LetterSpacedByLength nameLength={homeLineUp[i].name.length}>{homeLineUp[i].name}</LetterSpacedByLength>
                    </CursiveTd>
                </PlayerEl>
                :
                <></>
            }
        </>
    ));

    // useEffect(() => {
    //     let currentIndex = 0
    //     awayPlayersNameList.forEach((name, idx) => {
    //         const intervalId = setInterval(() => {
    //             if (currentIndex < name?.length) {
    //                 const copiedAwayNameList = [...awayNameList]
    //                 copiedAwayNameList[idx] = name.substring(0, currentIndex + 1)
    //                 console.log(copiedAwayNameList[idx]);
                    
    //                 setAwayNameList(copiedAwayNameList)
    //                 // setDisplayText(name.substring(0, currentIndex + 1))
    //                 currentIndex++
    //             } else {
    //                 clearInterval(intervalId)
    //             }
    //         }, 30)
    //     })
        
    // }, [onPlay])

    return (
        <>
            <CardBorder className={onPlay ? 'sheetBorder' : ''}>
            <Title>LINE-UP CARD</Title>
            <SheetContainer className={onPlay ? 'sheetActive' : 'sheet'}>
                <div>
                <Sheet>
                    <SheetDiv style={{borderBottom: '0px'}}>{awayTeam ? awayTeam : 'Away'}</SheetDiv>
                    {/* <Pitcher>선발투수 : <div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(awayLineUp[10].name)}</div></Pitcher> */}
                    <Pitcher>선발투수 : <div style={{display: 'flex', gap: '15px'}}><CursiveText>{startingPitcher}</CursiveText></div></Pitcher>
                    <SheetDiv>
                        <PlayerEl key={'title'}>
                            <Td>타순</Td>
                            <Td>위치</Td>
                            <Td style={{borderRight: '0px'}}>선수명</Td>
                        </PlayerEl>
                        {awayLineUp.map((player, index) => (
                            index < 9 ? 
                            <PlayerEl key={index}>
                                <Td style={{ borderBottom: index === 8 ? '0px' : '1px solid black' }}>{index + 1}</Td>
                                <CursiveTd style={{ borderBottom: index === 8 ? '0px' : '1px solid black' }}>{awayLineUp[index].position}</CursiveTd>
                                <CursiveTd style={{ borderBottom: index === 8 ? '0px' : '1px solid black', borderRight: '0px' }}>
                                    <LetterSpacedByLength nameLength={awayLineUp[index].name.length}>{visibleNames[index]}</LetterSpacedByLength>
                                </CursiveTd>
                            </PlayerEl>
                            : <></>
                        ))}
                        {/* { awayPlayerList } */}
                    </SheetDiv>
                </Sheet>
                <BullpenSheet>
                    <Pitcher>대기투수</Pitcher>
                    <Pitcher><CursiveText><div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(awayLineUp[11].name)}</div></CursiveText></Pitcher>
                    <Pitcher><CursiveText><div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(awayLineUp[12].name)}</div></CursiveText></Pitcher>
                </BullpenSheet>
                </div>
                <div>
                <Sheet>
                    <SheetDiv style={{borderBottom: '0px'}}>{homeTeam ? homeTeam : 'Home'}</SheetDiv>
                    <Pitcher>선발투수 : <div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(homeLineUp[10].name)}</div></Pitcher>
                    <SheetDiv>
                        <PlayerEl key={'title'}>
                            <Td>타순</Td>
                            <Td>위치</Td>
                            <Td style={{borderRight: '0px'}}>선수명</Td>
                        </PlayerEl>
                        { homePlayerList }
                    </SheetDiv>
                </Sheet>
                <BullpenSheet>
                    <Pitcher>대기투수</Pitcher>
                    <Pitcher><CursiveText><div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(homeLineUp[11].name)}</div></CursiveText></Pitcher>
                    <Pitcher><CursiveText><div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(homeLineUp[12].name)}</div></CursiveText></Pitcher>
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
    background-color: white;
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
        if (props.nameLength < 4) {
            return '18px'
        } else {
            return '8px'
        }
    }};
    font-family: "Nanum Pen Script", cursive;
    font-weight: 400;
    font-style: normal;
    letter-spacing: ${props => {
        if (props.nameLength < 4) {
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
    min-height: 35px;
`

const BullpenSheet = styled.div`
    margin-top: 15px;
    border: 2px solid black;
    border-bottom: 3px solid black;
`