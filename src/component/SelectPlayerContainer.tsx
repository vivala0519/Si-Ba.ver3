import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SelectBox from './SelectBox';

const SelectPlayerContainer = () => {
    type PlayerOption = React.ReactElement<{key: number, value: string}, "option">;
    type TeamOption = React.ReactElement<{key: number, value: string}, "option">;

    const [playerListByYear, setPlayerListByYear] = useState([])
    const [teamList, setTeamList] = useState<TeamOption[]>([])
    const [playerList, setPlayerList] = useState<PlayerOption[]>([])
    const yearList = Array.from({ length: 2023 - 1982 + 1 }, (_, i) => (
        <option key={i + 1982}>
            {i + 1982}
        </option>
      ))
    // const [year, setYear] = useState('')
    const [team, setTeam] = useState('')
    const [player, setPlayer] = useState('')

    const importJsonByYear = async (year: string) => {
        const fileName = `../stat_scraper/batters/${year}.json`;
        const data = await import(fileName).then(module => module.default);
        return data;
    }
    const handlerSelectYear = (year:string) => {
        if (year === '연도') {
            setTeamList([])
            setTeam('')
            return
        }
        importJsonByYear(year).then((result) => {
            // setYear(year)
            setPlayerListByYear(result)
            const teams = [...new Set(result.map((player) => player.team))]
            setTeam(teams[0])
            
            setTeamList(teams.map((team, idx) => <option key={idx}>{team}</option>))
            const playersDataByTeam = result.filter((player) => {
                if (teams[0] === player.team) {
                    return player
                }
            })
            setPlayerList(playersDataByTeam.map((player, idx) => <option key={idx}>{player.position} {player.name}</option>));
        })
    }

    const handlerSelectTeam = (team:string) => {
        setTeam(team)
    }

    const handlerSelectPlayer = (player) => {
        setPlayer(player)
    }
    
    useEffect(() => {
        handlerSelectTeam(team);
        const playersDataByTeam = playerListByYear.filter((player) => {
            if (player?.team === team) {
                return player
            }
        })
        setPlayerList(playersDataByTeam.map((player, idx) => <option key={idx}>{player.position} {player.name}</option>));
        setPlayer(playerList[0])
    }, [team])


    return (
        <>
            {/* <SelectBox width={77} defaultValue={'연도'} setYear={setYear}/>
            <SelectBox width={120} defaultValue={'팀'} />
            <SelectBox width={177} defaultValue={'선수'} /> */}
            <YearSelectBox onChange={(event) => handlerSelectYear(event.target.value)}>
                <option key='default'>연도</option>
                {yearList}
            </YearSelectBox>
            <TeamSelectBox value={team} onChange={(event) => handlerSelectTeam(event.target.value)}>
                {teamList}
            </TeamSelectBox>
            <PlayerSelectBox value={player} onChange={(event) => handlerSelectPlayer(event.target.value)}>
                {playerList}
            </PlayerSelectBox>
            <button>add</button>
        </>
    )
}
export default SelectPlayerContainer

const YearSelectBox = styled.select`
    text-align: center;
    width: 77px;
    height: 30px;
`

const TeamSelectBox = styled.select`
    text-align: center;
    width: 120px;
    height: 30px;
`

const PlayerSelectBox = styled.select`
    text-align: center;
    width: 177px;
    height: 30px;
`
