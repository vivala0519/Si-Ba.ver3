import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface PropsType {
    placeholder: string
}
const LineUp = (props: PropsType) => {
    // props
    const { placeholder } = props;
    // state
    const [team, setTeam] = useState('')
    // batter/pitcher list declare
    const batterList = Array.from({ length: 9 }, (_, i) => (
        <Player key={i} style={{display: 'flex', justifyContent: 'spaceBetween'}}>
            <div>{i + 1}</div>
            <Batter />
        </Player>
      ));
    const pitcherList = Array.from({ length : 3 }, (_, i) => (
        <Player key={i} style={{display: 'flex', justifyContent: 'spaceBetween'}}>
            <div>{i === 0 ? 'SP' : i === 1 ? 'RP' : 'CP'}</div>
            <Pitcher />
        </Player>
    ));

    const clickHandler = (event) => {
        console.log(event);
        
    }

    useEffect(() => {
        console.log(team);
    }, [team])

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column'}} onClick={((event) => clickHandler(event))}>
                <TeamName placeholder={placeholder} onChange={(event) => setTeam(event.target.value)}/>
                { batterList }
                { pitcherList }
            </div>
        </>
    )
}

export default LineUp

const TeamName = styled.input`
    text-align: center;
    placeholderTextColor: red
`

const Batter = styled.input`
	text-align: center
`

const Pitcher = styled.input`
    text-align: center
`

const Player = styled.div`
    display: flex;
    justify-content: space-between
`