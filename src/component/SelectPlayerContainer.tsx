import {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react'
import DropDownBox from './DropDownBox'
import SearchBox from './SearchBox'
import styled from 'styled-components'
import changeModeButton from '../assets/change-mode.svg'
import addBatterButton from '../assets/add-batter.svg'
import addPitcherButton from '../assets/add-pitcher.svg'

interface Player {
    team: string
    position: string
    name: string
    year: string
}

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    selected?: string
}

const SelectPlayerContainer = (props) => {
    // props
    const { selectedArea, setAddedPlayer } = props
    // 연도 declare
    const yearList = Array.from({ length: 2023 - 1982 + 1 }, (_, i) => String(i + 1982))
    
    const [selectMode, setSelectMode] = useState(true)
    const [playerListByYear, setPlayerListByYear] = useState([])
    const [teamList, setTeamList] = useState<string[]>([])
    const [playerList, setPlayerList] = useState<Player[]>([])
    const [year, setYear] = useState<string>('1982')
    const [team, setTeam] = useState<string>('')
    const [player, setPlayer] = useState<string>('')
    const [selectedIdx, setSelectedIdx] = useState<number>(0);
    
    const importJsonByYear = async (year: string) => {
        if (year && selectedArea) {
            const positionNumber = selectedArea.slice(4)
            let fromWhere = 'batters'
            if (positionNumber > 9) {
                fromWhere = 'pitchers'
            }

            const fileName = `/src/stat_scraper/${fromWhere}/${year}.json`

            try {
                const response = await fetch(fileName)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                setPlayerListByYear(data)
                const teams = [...new Set(data.map((player) => player.team))].sort() as string[]
                setTeamList(teams)
                return data;
            } catch (error) {
                console.error('Failed to fetch the JSON data:', error)
            }
        }
    }

    // 선수 추가 Func
    const addPlayer = () => {
        if (Number(selectedArea?.slice(4)) < 13) {
            playerList[selectedIdx].year = year
            setAddedPlayer(playerList[selectedIdx]);
        }
    }

    // 연도에 따른 data json 가져오기
    useEffect(() => {
        importJsonByYear(year);
    }, [year, selectedArea])

    // 연도에 따라 팀 리스트 바뀌면 default [0] 설정
    useEffect(() => {
        setTeam(teamList[0])
    }, [teamList])
    // 
    useEffect(() => {
        const playersDataByTeam:Player[] = playerListByYear.filter((player) => {
            if (team === player.team) {
                return player
            }
        })
        // 포지션 순으로 정렬
        const orderByPosition = ['DH', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF']
        const sortedList:Player[] = playersDataByTeam.sort((a, b) => orderByPosition.indexOf(a.position) - orderByPosition.indexOf(b.position));
        
        setPlayerList(sortedList)
        setSelectedIdx(0);
    }, [teamList, team, playerListByYear])

    // 선택된 player Func
    useEffect(() => {
        // console.log('select: ', playerList[selectedIdx]);
        
    }, [selectedIdx, playerList])

    useEffect(() => {
        
    }, [selectMode])


    return (
        <div>
            <SelectContainer selected={selectedArea}>
                {selectedArea ? 
                    selectMode ? 
                    <>
                        {/* <ChangeMode onClick={() => setSelectMode(!selectMode)}>search</ChangeMode> */}
                        <DropDownBox type='Year' state={year} setState={setYear} propList={yearList} width={120}/>
                        <DropDownBox type='Team' state={team} setState={setTeam} propList={teamList} width={120}/>
                        <DropDownBox type='Player' state={player} setState={setPlayer} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} propList={playerList} width={177}/>
                        {/* <ViewDetailStat /> */}
                        {Number(selectedArea.slice(4)) > 9 ? <AddPitcher onClick={addPlayer} /> : <AddBatter onClick={addPlayer} />}
                    </>
                    : 
                    <>
                        <ChangeMode onClick={() => setSelectMode(!selectMode)}>list</ChangeMode>
                        <SearchBox />
                    </>
                :
                    <SelectAreaHelp>선수 등록을 위해 영역을 선택해 주세요</SelectAreaHelp>
                }
            </SelectContainer>
            {/* <div>
                <SearchBox />
            </div> */}
        </div>
    )
}
export default SelectPlayerContainer

const SelectContainer = styled.div<styleProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-top: 25px;
    margin-bottom: 15px;
    margin-right: ${props => props.selected && '-50px'};
`

// const ViewDetailStat = styled.div`
//     position: relative;
//     left: -40px;
//     width: 10px;
//     height: 10px;
//     background-color: blue;

//     &:hover {
//         cursor: pointer};
//     }
// `

const AddBatter = styled.button`
    background: url(${addBatterButton}) no-repeat center center;
    background-size: contain;
    cursor: pointer;
    border: none;
    width: 53px;
    height: 32px;
    &:hover,
    &:focus {
        outline: none;
    }
`


const AddPitcher = styled.button`
    background: url(${addPitcherButton}) no-repeat center center;
    background-size: contain;
    cursor: pointer;
    border: none;
    width: 53px;
    height: 32px;
    &:hover,
    &:focus {
        outline: none;
    }
`

const ChangeMode = styled.button`
    background: url(${changeModeButton}) no-repeat center center;
    background-size: contain;
    cursor: pointer;
    border: none;
    font-size: 9px;
    width: 70px;
    height: 40px;
    &:hover,
    &:focus {
        outline: none;
    }
`

const SelectAreaHelp = styled.div`
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    //color: #BB2649;
`