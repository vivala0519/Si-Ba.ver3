import { useEffect, useState } from 'react'
import DropDownBox from './DropDownBox';
import SearchBox from './SearchBox';
import styled from 'styled-components'
import changeModeButton from '../assets/change-mode.svg';
import addPlayerButton from '../assets/add-player.svg';

interface Player {
    team: string
    position: string
    name: string
    year: string
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
            
            const fileName = `../stat_scraper/${fromWhere}/${year}.json`
            const data = await import(fileName).then(module => module.default)
            setPlayerListByYear(data)
            const teams = [...new Set(data.map((player:Player) => player.team))].sort() as string[]
            setTeamList(teams)
            return data
        }
    }

    // 선수 추가 Func
    const addPlayer = () => {
        if (selectedArea) {
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
        console.log('select: ', playerList[selectedIdx]);
        
    }, [selectedIdx, playerList])

    useEffect(() => {
        
    }, [selectMode])


    return (
        <div>
            <SelectContainer>
                {selectedArea ? 
                    selectMode ? 
                    <>
                        {/* <ChangeMode onClick={() => setSelectMode(!selectMode)}>search</ChangeMode> */}
                        <DropDownBox type='Year' state={year} setState={setYear} propList={yearList} width={120}/>
                        <DropDownBox type='Team' state={team} setState={setTeam} propList={teamList} width={120}/>
                        <DropDownBox type='Player' state={player} setState={setPlayer} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} propList={playerList} width={177}/>
                        {/* <ViewDetailStat /> */}
                        <AddPlayerButton onClick={addPlayer} />
                    </>
                    : 
                    <>
                        <ChangeMode onClick={() => setSelectMode(!selectMode)}>list</ChangeMode>
                        <SearchBox />
                    </>
                :
                    <div>select area for add</div> 
                }
            </SelectContainer>
            {/* <div>
                <SearchBox />
            </div> */}
        </div>
    )
}
export default SelectPlayerContainer

const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
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

const AddPlayerButton = styled.button`
    background: url(${addPlayerButton}) no-repeat center center;
    background-size: contain;
    cursor: pointer;
    border: none;
    width: 70px;
    height: 40px;
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