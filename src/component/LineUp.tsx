import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import './LineUp.css'
// import selectedPlayer from '../assets/selected-player.svg'

interface PropsType {
    way: string
    selectedArea: string | null
    setSelectedArea: React.Dispatch<React.SetStateAction<string | null>>
    addedPlayer: object | null
    setAddedPlayer: React.Dispatch<React.SetStateAction<object | null>>
}

interface PlayerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    $hover: boolean
    selected: boolean
}

interface LineUp {
    name: string
    position: string
    avg: number
}

const LineUp = (props: PropsType) => {
    // props
    const { way, selectedArea, setSelectedArea, addedPlayer, setAddedPlayer } = props;
    // state
    const [team, setTeam] = useState('')
    const [lineUpList, setLineUpList] = useState<Array<LineUp | null>>(Array.from({ length: 13 }, () => null));
    
    const playerList = Array.from({ length: 13 }, (_, i) => (
        <Player
            className={selectedArea === way + i ? 'player' : ''}
            key={way + i}
            selected={selectedArea ? selectedArea === way + i : false}
            onClick={() => clickHandler(i)}
            $hover={i !== 9}
        >
            {i === 9 ? 
                <SeperatorLine key='seperator-line'/>
            :
                <>
                    <LineUpNumber>{i === 10 ? '선발' : i === 11 ? '중계' : i === 12 ? '마무리' : `${i + 1}번`}</LineUpNumber>
                    <PlayerName>{lineUpList[i] ? `${lineUpList[i]?.name}` : ''}</PlayerName>
                    {i < 10 ? <Position>{lineUpList[i] ? `${lineUpList[i]?.position}` : ''}</Position> : <Position/>}
                    {i < 10 ? <Average>{lineUpList[i] ? `0${lineUpList[i]?.avg}` : ''}</Average> : <Average/>}
                </>
            }
        </Player>
    ));

    const clickHandler = (i:number) => {
        if (i === 9) {
            return;
        } else {
            setSelectedArea(playerList[i].key);
        }
    }

    useEffect(() => {
        console.log(team);
    }, [team])

    useEffect(() => {
        // 라인업에 추가 후 초기화
        const selectedPlace = selectedArea?.split(way)[1]
        if (addedPlayer && selectedPlace) {
            console.log('add - ', addedPlayer);

            const copiedLineUp = [...lineUpList]
            copiedLineUp[selectedPlace] = addedPlayer

            setLineUpList(copiedLineUp);
            setAddedPlayer(null)
        }
    }, [addedPlayer])

    return (
        <>
            <div style={{display: 'flex', flexDirection: 'column', width: '270px'}}>
                <TeamName placeholder={way} onChange={(event) => setTeam(event.target.value)}/>
                { playerList }
            </div>
        </>
    )
}

export default LineUp

const TeamName = styled.input`
    type: text;
    position: relative;
    left: 22px;
    text-align: center;
    maxlength: 8;
    margin-bottom: 4px;
    height: 30px;
    width: 81%;
    border: 2px solid #ffbe98;
    border-radius: 50% 20% / 10% 40%;
    ::placeholder {
        color: red;
        opacity: 1;
    }
`

const Player = styled.div<PlayerProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px;
    border: 3px solid transparent;

    ${(props) =>
        props.selected &&
        css`
        // background-image: url('../assets/selected-player.svg');
        //   background-color: #ffbe98;
        // background: url('../assets/selected-player.svg') 0 0 no-repeat;
    `}

    &:hover {
        // background-color: ${props => props.$hover ? '#ffbe98' : 'transparent'};
        border: ${props => props.$hover && !props.selected ? '3px solid #ffbe98' : '3px solid transparent'};
        border-radius: 5px;
        cursor: ${props => props.$hover ? 'pointer' : 'default'};
    }
`

const SeperatorLine = styled.hr`
    border: 1px solid #ffbe98;
    width: 100%;
`

const LineUpNumber = styled.div`
    margin: 2px;
    text-align: center;
    width: 48px;
`

const PlayerName = styled.div`
	text-align: center;
    position: relative;
    left: -5px;
    width: 80px;
`

const Position = styled.div`
	text-align: center;
    width: 20px;
`

const Average = styled.div`
	text-align: center;
    width: 40px;
    margin-right: 10px;
`