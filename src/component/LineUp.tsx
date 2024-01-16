import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface PropsType {
    placeholder: string
}
const LineUp = (props: PropsType) => {
    
    const { placeholder } = props;
    const [team, setTeam] = useState('')
    const batterList = Array.from({ length: 9 }, (_, i) => (
        <div key={i} style={{display: 'flex'}}>
            <div>{i + 1}</div>
            <Batter />
        </div>
      ));
    const pitcherList = Array.from({ length : 3 }, (_, i) => (
        <div key={i} style={{display: 'flex'}}>
            <div>{i === 0 ? 'SP' : i === 1 ? 'RP' : 'CP'}</div>
            <Pitcher />
        </div>
    ));
    
    useEffect(() => {
        console.log(team);
    }, [team])

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column'}}>
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
    placeholderTextColor: red;
`

const Batter = styled.input`
	text-align: center
`

const Pitcher = styled.input`
    text-align: center
`