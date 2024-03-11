import React, { useState, DetailedHTMLProps, HTMLAttributes, useEffect } from 'react'
import styled, { css } from 'styled-components'
import './LineUp.css'
import styles from './TeamName.module.scss'

interface PropsType {
    way: string
    team: string
    setTeam: React.Dispatch<React.SetStateAction<string | null>>
    selectedArea: string | null
    setSelectedArea: React.Dispatch<React.SetStateAction<string | null>>
    addedPlayer: object | null
    setAddedPlayer: React.Dispatch<React.SetStateAction<object | null>>
    lineUpList: Array<LineUp | null>
    setLineUpList: React.Dispatch<React.SetStateAction<Array<LineUp | null> | null>>
    onReady: boolean
}

interface PlayerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    $hover?: boolean
    selected?: boolean
    $focused?: boolean
    $ready?: boolean
    $way?: string
    $teamName?: string
    $pitcher?: boolean
    $num?: number
}

interface LineUp {
    name: string
    position: string
    avg: number
    year: string
}

const LineUp = (props: PropsType) => {
    // props
    const { way, selectedArea, setSelectedArea, addedPlayer, setAddedPlayer, lineUpList, setLineUpList, team, setTeam, onReady } = props;
    
    const playerList = Array.from({ length: 13 }, (_, i) => (
        <Player
            className={`player ${selectedArea === way + i ? 'selected' + way : ''}`}
            key={way + i}
            selected={selectedArea ? selectedArea === way + i : false}
            onClick={() => clickHandler(i)}
            $hover={i !== 9}
            $way={way}
            $num={i}
        >
            {i === 9 ? 
                <SeperatorLine key='seperator-line'/>
            :
                <>
                    <LineUpNumber selected={selectedArea === way + i} $num={i}>{i === 10 ? '선발' : i === 11 ? '중계' : i === 12 ? '마무리' : `${i + 1}`}</LineUpNumber>
                    <PlayerName selected={selectedArea === way + i} $way={way}>{lineUpList[i] ? `${lineUpList[i]?.year.slice(2)}  ${lineUpList[i]?.name}` : ''}</PlayerName>
                    {i < 10 ? <Position>{lineUpList[i] ? `${lineUpList[i]?.position}` : ''}</Position> : <Position/>}
                    {i < 10 ? <Average $way={way} $pitcher={false}>{lineUpList[i] ? `0${lineUpList[i]?.avg}` : ''}</Average> : <Average $pitcher={true}/>}
                </>
            }
        </Player>
    ));

    const [focused, setFocused] = useState(false)

    const clickHandler = (i:number) => {
        if (i === 9) {
            return;
        } else {
            setSelectedArea(playerList[i].key);
        }
    }

    const moveToNextEmptyArea = (nowNumber) => {
        const plusNumber = nowNumber === 8 ? 2 : 1
        if (!lineUpList[nowNumber + plusNumber]) {
            setSelectedArea(way + String(nowNumber + plusNumber))
        } else {
            moveToNextEmptyArea(nowNumber + plusNumber)
        }
    }

    useEffect(() => {
        // console.log(team);
    }, [team])

    useEffect(() => {
        // 라인업에 추가 후 addedPlayer 초기화
        const selectedPlace = selectedArea?.split(way)[1]
        if (addedPlayer && selectedPlace) {
            // console.log('add - ', addedPlayer);
            if (addedPlayer['position'] !== 'P' && Number(selectedPlace) > 8) {
                return
            }

            lineUpList[selectedPlace] = addedPlayer
            const copiedLineUp = [...lineUpList]

            setLineUpList(copiedLineUp);
            setAddedPlayer(null)
            
            // 추가 후 이동된 area에 데이터 있으면 다음 area로
            moveToNextEmptyArea(Number(selectedPlace))
        }
    }, [addedPlayer])

    return (
        <>
            <LineUpContainer $ready={onReady} $way={way}>
                <TeamNameContainer $way={way} $focused={focused}>
                    <TeamNameBorder className={focused && styles.title}>
                        <TeamName
                            onChange={(event) => setTeam(event.target.value)}
                            maxLength={13}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                        <WayText $focused={focused} $teamName={team}>{way}</WayText>
                    </TeamNameBorder>
                </TeamNameContainer>
                { playerList }
            </LineUpContainer>
        </>
    )
}

export default LineUp

const LineUpContainer = styled.div<PlayerProps>`
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: transform 0.5s;
    transform: ${props => props.$ready && (props.$way === 'Away' ? 'translateX(-50px)' : 'translateX(50px)')};

    @media (max-width: 821px) {
        transform: ${props => props.$ready && (props.$way === 'Away' ? 'translateX(-5px)' : 'translateX(5px)')};
    }
`

const TeamNameContainer = styled.div<PlayerProps>`
    position: relative;
    // left: ${props => (props.$way === 'Away' ? '0px' : '18px')};
    margin-bottom: 30px;
    margin-top: 20px;
    //width: 100%;
    width: 240px;
    height: 40px;
    border: 2px outset #BB2649;
    border-radius: 3px;
    @media (max-width: 821px) {
        height: 4vh;
        width: 90%;
        position: relative;
        left: 5%;
    }
    filter: ${props => {
        if (props.$focused) {
            return 'drop-shadow(0 0 2px rgba(187, 38, 73, 0.3)) drop-shadow(0 0 5px rgba(187, 38, 73, 0.3)) drop-shadow(0 0 15px rgba(187, 38, 73, 0.3))';
        }
    }};
`

const TeamNameBorder = styled.div`
    //width: 100%;
    width: 100%;
    height: 40px;
    @media (max-width: 821px) {
        height: 4vh;
    }
`

const TeamName = styled.input`
    font-family: "Hahmlet", serif;
    font-style: normal;
    left: 9px;
    text-align: center;
    border: none;
    font-size: 17px;
    width: 100%;
    height: 90%;
    outline: none;
    touch-action: manipulation;
    ::placeholder {
        color: red;
        opacity: 1;
    }
    z-index: 0;
    @media (max-width: 821px) {
        font-size: 12px;
    }
`

const WayText = styled.span<PlayerProps>`
    position: absolute;
    font-size: 12px;
    left: 43%;
    @media (max-width: 821px) {
        left: 40%;
    };
    top: ${props => {
        if (props.$focused) {
            // return '-72px';
            // return '-190%';
            return '-90%';
        } else {
            if (props.$teamName) {
                // return '-72px';
                // return '-180%';
                return '-75%';
            } else {
                // return '-30px';
                // return '-81%';
                return '20%';
            }
        }
    }};
    font-family: "Hahmlet", serif;
    font-style: normal;
    pointer-events: none;
    color: ${props => {
        if (props.$teamName || props.$focused) {
            return '#BB2649';
        } else {
            return '#888888';
        }
    }};
    transition: top 0.3s ease;
`

const Player = styled.div<PlayerProps>`
    display: flex;
    justify-content: space-between;
    gap: 11px;
    align-items: center;
    margin: 2px;
    border: 3px solid transparent;
    position: relative;
    
    flex-direction: ${props => {
        if (props.$way === 'Away') {
            return 'row-reverse';
        }
    }};

    ${(props) =>
        props.selected &&
        css`
    `}

    &:hover {
        border: ${props => props.$hover && !props.selected ? '3px solid #BB2649' : '3px solid transparent'};
        border-radius: 5px;
        cursor: ${props => props.$hover ? 'pointer' : 'default'};
        filter: drop-shadow(0 0 2px rgba(187, 38, 73, 0.5)) drop-shadow(0 0 5px rgba(187, 38, 73, 0.5)) drop-shadow(0 0 15px rgba(187, 38, 73, 0.5));
    }
`

const SeperatorLine = styled.hr`
    border: 2px outset #BB2649;
    width: 100%;
`

const LineUpNumber = styled.div<PlayerProps>`
    margin: 2px;
    text-align: center;
    width: ${props => props.$num < 9 ? '20%' : '48px'};
    font-family: "Hahmlet", serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: 700;
    color: ${props => props.selected && 'white'}
`

const PlayerName = styled.div<PlayerProps>`
	text-align: center;
    position: relative;
    left: ${props => props.$way === 'Home' && '-5px'};
    //width: 106px;
    width: 50%;
    font-family: "Hahmlet", serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: 700;
    color: ${props => props.selected && 'white'}
`

const Position = styled.div`
	text-align: center;
    //width: 27px;
    width: 13%;
    font-family: "Hahmlet", serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: 700;
`

const Average = styled.div<PlayerProps>`
	text-align: center;
    font-weight: 700;
    font-optical-sizing: auto;
    //width: 40px;
    width: 17%;
    margin-right: ${props => props.$way === 'Away' ? '10px' : '20px'};
    margin-left: ${props => props.$way === 'Away' && '10px'};
    display: ${props => {
        if (props.$pitcher) {
            return 'none';
        }
    }};
`