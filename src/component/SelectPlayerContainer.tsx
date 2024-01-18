import { useEffect, useState } from 'react'
import SelectBox from './SelectBox';
// import SearchBox from './SearchBox';
import styled from 'styled-components'

interface Player {
    team: string;
    position: string;
    // name: string;
}

const SelectPlayerContainer = () => {
    const yearList = Array.from({ length: 2023 - 1982 + 1 }, (_, i) => String(i + 1982))
    
    const [playerListByYear, setPlayerListByYear] = useState([])
    const [teamList, setTeamList] = useState<string[]>([])
    const [playerList, setPlayerList] = useState([])
    const [year, setYear] = useState<string>('1982')
    const [team, setTeam] = useState<string>('')
    const [player, setPlayer] = useState<string>('')
    const [selectedIdx, setSelectedIdx] = useState<number>(0);
    // const [playersDetailList, setPlayersDetailList] = useState<{position: string, name: string}[]>([])
    
    
    const importJsonByYear = async (year: string) => {
        if (year) {
            const fileName = `../stat_scraper/batters/${year}.json`
            const data = await import(fileName).then(module => module.default)
            setPlayerListByYear(data)
            const teams = [...new Set(data.map((player:Player) => player.team))].sort() as string[]
            setTeamList(teams);
            return data
        }
    }
    useEffect(() => {
        importJsonByYear(year);
    }, [year])
    useEffect(() => {
        setTeam(teamList[0])
    }, [teamList])
    useEffect(() => {
        const playersDataByTeam:[] = playerListByYear.filter((player) => {
            if (team === player.team) {
                return player
            }
        })
        // const extractPositionName: [] = playersDataByTeam.map(player => {
        //     return player
        // })
        // 포지션 순으로 정렬
        const orderByPosition = ['DH', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF'];
        const sortedList:[] = playersDataByTeam.sort((a, b) => orderByPosition.indexOf(a.position) - orderByPosition.indexOf(b.position));
        
        // const playersDisplayTextList = sortedList.map(player => {
        //     return `${player.position} ${player.name}`
        // });


        setPlayerList(sortedList);
        setSelectedIdx(0);
    }, [teamList, team, playerListByYear])

    // 선택된 player function
    useEffect(() => {
        console.log(playerList[selectedIdx]);
        
    }, [selectedIdx])


    return (
        <div>
            <SelectContainer>
                <SelectBox state={year} setState={setYear} propList={yearList} width={77} />
                <SelectBox state={team} setState={setTeam} propList={teamList} width={120} />
                <SelectBox type='player' state={player} setState={setPlayer} setSelectedIdx={setSelectedIdx} propList={playerList} width={177} />
                <ViewDetailStat />
                <button>add</button>
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