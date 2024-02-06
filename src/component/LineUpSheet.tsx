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

const LineUpSheet = (props: PropsType) => {
    const { awayTeam, homeTeam, awayLineUp, homeLineUp, onPlay } = props
    
    const arrayFromName = (name) => {
        return [...name]
    }
    const characterSpanByName = (name) => Array.from({ length: arrayFromName(name).length}, (_, i) => (
        <CursiveText>{arrayFromName(name)[i]}</CursiveText>
    ))
    
    const awayPlayerList = Array.from({ length: 9 }, (_, i) => (
        <>
            {i !== 9 ? 
                <PlayerEl key={i}>
                    <Td style={{borderBottom: i === 8 ? '0px' : '1px solid black'}}>{i + 1}</Td>
                    <CursiveTd style={{borderBottom: i === 8 ? '0px' : '1px solid black'}}>{awayLineUp[i].position}</CursiveTd>
                    <CursiveTd style={{borderBottom: i === 8 ? '0px' : '1px solid black', borderRight: '0px'}}>
                        <div style={{display: 'flex', gap: '15px'}}>
                            {characterSpanByName(awayLineUp[i].name)}
                        </div>
                    </CursiveTd>
                </PlayerEl>
                :
                <></>
            }
        </>
    ));
    
    const homePlayerList = Array.from({ length: 9 }, (_, i) => (
        <>
            {i !== 9 ? 
                <PlayerEl key={i}>
                    <Td style={{borderBottom: i === 8 ? '0px' : '1px solid black'}}>{i + 1}</Td>
                    <CursiveTd style={{borderBottom: i === 8 ? '0px' : '1px solid black'}}>{homeLineUp[i].position}</CursiveTd>
                    <CursiveTd style={{borderBottom: i === 8 ? '0px' : '1px solid black', borderRight: '0px'}}>
                        <div style={{display: 'flex', gap: '15px'}}>
                            {characterSpanByName(homeLineUp[i].name)}
                        </div>
                    </CursiveTd>
                </PlayerEl>
                :
                <></>
            }
        </>
    ));

    return (
        <>
            <SheetContainer className={onPlay ? 'sheetActive' : 'sheet'}>
                <div>
                <Sheet>
                    <SheetDiv style={{borderBottom: '0px'}}>{awayTeam ? awayTeam : 'Away'}</SheetDiv>
                    {/* <Pitcher>선발투수 : <CursiveText>{awayLineUp[10].name}</CursiveText></Pitcher> */}
                    <Pitcher>선발투수 : <div style={{display: 'flex', gap: '15px'}}>{characterSpanByName(awayLineUp[10].name)}</div></Pitcher>
                    <SheetDiv>
                        <PlayerEl key={'title'}>
                            <Td>타순</Td>
                            <Td>위치</Td>
                            <Td style={{borderRight: '0px'}}>선수명</Td>
                        </PlayerEl>
                        { awayPlayerList }
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
        </>
    )
}

export default LineUpSheet


const SheetContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;
}
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
    margin-top: 10px;
    border: 2px solid black;
    border-bottom: 3px solid black;
`