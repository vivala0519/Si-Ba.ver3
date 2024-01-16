import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface BoxProps {
    width: number;
    defaultValue: string;
}

const SelectBox = (props:BoxProps) => {
    const {width, defaultValue} = props;
    
    type options = React.ReactElement<{key: number, value: string}, "option">;
    const propList:options[] = [];
    // const [list, setList] = useState<options[]>([])
    
    // type PlayerOption = React.ReactElement<{key: number, value: string}, "option">;
    // type TeamOption = React.ReactElement<{key: number, value: string}, "option">;

    // const [playerListByYear, setPlayerListByYear] = useState([])
    // const [teamList, setTeamList] = useState<TeamOption[]>([])
    // const [playerList, setPlayerList] = useState<PlayerOption[]>([])
    // const yearList = Array.from({ length: 2023 - 1982 + 1 }, (_, i) => (
    //     <option key={i + 1982}>
    //         {i + 1982}
    //     </option>
    //   ))
    // // const [year, setYear] = useState('')
    // const [team, setTeam] = useState('')
    // const [player, setPlayer] = useState('')

    // const importJsonByYear = async (year: string) => {
    //     const fileName = `../stat_scraper/batters/${year}.json`;
    //     const data = await import(fileName).then(module => module.default);
    //     return data;
    // }
    // const handlerSelectYear = (year:string) => {
    //     if (year === '연도') {
    //         setTeamList([])
    //         setTeam('')
    //         return
    //     }
    //     importJsonByYear(year).then((result) => {
    //         // setYear(year)
    //         setPlayerListByYear(result)
    //         const teams = [...new Set(result.map((player) => player.team))]
    //         setTeam(teams[0])
            
    //         setTeamList(teams.map((team, idx) => <option key={idx}>{team}</option>))
    //         const playersDataByTeam = result.filter((player) => {
    //             if (teams[0] === player.team) {
    //                 return player
    //             }
    //         })
    //         setPlayerList(playersDataByTeam.map((player, idx) => <option key={idx}>{player.position} {player.name}</option>));
    //     })
    // }

    // const handlerSelectTeam = (team:string) => {
    //     setTeam(team)
    // }

    // const handlerSelectPlayer = (player) => {
    //     setPlayer(player)
    // }
    
    // useEffect(() => {
    //     handlerSelectTeam(team);
    //     const playersDataByTeam = playerListByYear.filter((player) => {
    //         if (player?.team === team) {
    //             return player
    //         }
    //     })
    //     setPlayerList(playersDataByTeam.map((player, idx) => <option key={idx}>{player.position} {player.name}</option>));
    //     setPlayer(playerList[0])
    // }, [team])


    return (
        <>
            <Box width={width} defaultValue={defaultValue} >
                <option key='default' disabled>{defaultValue}</option>
                {propList}
            </Box>
            {/* <YearSelectBox onChange={(event) => handlerSelectYear(event.target.value)}>
                <option key='default'>연도</option>
                {yearList}
            </YearSelectBox>
            <TeamSelectBox value={team} onChange={(event) => handlerSelectTeam(event.target.value)}>
                {teamList}
            </TeamSelectBox>
            <PlayerSelectBox value={player} onChange={(event) => handlerSelectPlayer(event.target.value)}>
                {playerList}
            </PlayerSelectBox>
            <div>add</div> */}
        </>
    )
}
export default SelectBox

const Box = styled.select<BoxProps>`
    text-align: center;
    width: ${props => props.width || 100}px;
    height: 30px;
`