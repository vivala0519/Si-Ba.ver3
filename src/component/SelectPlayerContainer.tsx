import { useEffect, useState } from 'react'
import SelectBox from './SelectBox';

interface Player {
    team: string;
    position: string;
    name: string;
}

const SelectPlayerContainer = () => {
    const yearList = Array.from({ length: 2023 - 1982 + 1 }, (_, i) => String(i + 1982))
    
    const [playerListByYear, setPlayerListByYear] = useState([])
    const [teamList, setTeamList] = useState<string[]>([])
    const [playerList, setPlayerList] = useState<string[]>([])
    const [year, setYear] = useState<string>('1982')
    const [team, setTeam] = useState<string>('')
    const [player, setPlayer] = useState<string>('')
    
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
        const playersDataByTeam:Player[] = playerListByYear.filter((player:Player) => {
            if (team === player.team) {
                return player
            }
        })
        const playersDisplayTextList:string[] = playersDataByTeam.map(player => {
            return `${player.position} ${player.name}`
        })

        setPlayerList(playersDisplayTextList);
    }, [teamList, team, playerListByYear])


    return (
        <div>
            <SelectBox state={year} setState={setYear} propList={yearList} width={77} />
            <SelectBox state={team} setState={setTeam} propList={teamList} width={120} />
            <SelectBox state={player} setState={setPlayer} propList={playerList} width={177} />
            <button>add</button>
        </div>
    )
}
export default SelectPlayerContainer