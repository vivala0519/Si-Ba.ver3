import { useEffect, useState } from 'react'
import SelectBox from './SelectBox';
// import SearchBox from './SearchBox';
import styled from 'styled-components'

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
            //@ts-expect-error: not a bug
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


    return (
        <div>
            <SelectContainer>
                {selectedArea ? 
                    <>
                        <SelectBox state={year} setState={setYear} propList={yearList} width={77} />
                        <SelectBox state={team} setState={setTeam} propList={teamList} width={120} />
                        <SelectBox type='player' state={player} setState={setPlayer} setSelectedIdx={setSelectedIdx} propList={playerList} width={177} />
                        <ViewDetailStat />
                        <button onClick={addPlayer}>add</button>
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
`

const ViewDetailStat = styled.div`
    position: relative;
    left: -40px;
    width: 10px;
    height: 10px;
    background-color: blue;

    &:hover {
        cursor: pointer};
    }
`