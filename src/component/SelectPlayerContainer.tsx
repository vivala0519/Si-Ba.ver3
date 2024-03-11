import {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react'
import DropDownBox from './DropDownBox'
import SearchBox from './SearchBox'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase.js'
import styled from 'styled-components'
import changeModeButton from '../assets/change-mode.svg'
import addBatterButton from '../assets/add-batter.svg'
import addPitcherButton from '../assets/add-pitcher.svg'
import './SelectPlayerContainer.css'

interface Player {
    team: string
    position: string
    name: string
    year: string
}

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    selected?: string
    $width?: string
}

const SelectPlayerContainer = (props) => {
    // props
    const { selectedArea, setAddedPlayer } = props
    // 연도 declare
    const yearList = Array.from({ length: 2023 - 1982 + 1 }, (_, i) => String(2023 - i))

    const [selectMode, setSelectMode] = useState(true)
    const [teamList, setTeamList] = useState<string[]>([])
    const [playerList, setPlayerList] = useState<Player[]>([])
    const [year, setYear] = useState<string>('2023')
    const [team, setTeam] = useState<string>('')
    const [player, setPlayer] = useState<string>('')
    const [selectedIdx, setSelectedIdx] = useState<number>(0)
    const [batterList, setBatterList] = useState<Player[]>([])
    const [pitcherList, setPitcherList] = useState<Player[]>([])
    const [loadingFlag, setLoadingFlag] = useState(false)

    const importJsonByYear = async (year: string) => {
        if (year) {
            setLoadingFlag(true)
            const batterDataSnapshot = doc(db, 'batters', year)
            const batterResponse = await getDoc(batterDataSnapshot)
            const batterDataArray = Object.values(batterResponse.data())

            const pitcherDataSnapshot = doc(db, 'pitchers', year)
            const pitcherResponse = await getDoc(pitcherDataSnapshot)
            const pitcherDataArray = Object.values(pitcherResponse.data())

            setBatterList(batterDataArray)
            setPitcherList(pitcherDataArray)

            const teams = [...new Set(batterDataArray.map((player) => player.team))].sort() as string[]
            setTeamList(teams)
            setLoadingFlag(false)


            // const fileNasme = `/src/stat_scraper/${fromWhere}/${year}.json`

            // try {
            //     const response = await fetch(fileName)
            //     if (!response.ok) {
            //         throw new Error(`HTTP error! status: ${response.status}`)
            //     }
            //
            //     const data = await response.json()
            //     setPlayerListByYear(data)
            //     const teams = [...new Set(data.map((player) => player.team))].sort() as string[]
            //     setTeamList(teams)
            //     return data;
            // } catch (error) {
            //     console.error('Failed to fetch the JSON data:', error)
            // }
        }
    }

    // 선수 추가 Func
    const addPlayer = () => {
        if (Number(selectedArea?.slice(4)) < 13) {
            playerList[selectedIdx].year = year
            setAddedPlayer(playerList[selectedIdx]);
        }
    }

    // 연도에 따른 data json 가져오기
    useEffect(() => {
        importJsonByYear(year);
    }, [year])

    // 연도에 따라 팀 리스트 바뀌면 default [0] 설정
    useEffect(() => {
        setTeam(teamList[0])
    }, [teamList])
    //
    useEffect(() => {
        if (selectedArea) {
            const positionNumber = selectedArea.slice(4)
            let playersDataByTeam = []
            const fromList = positionNumber > 9 ? pitcherList : batterList
            playersDataByTeam = fromList.filter((player) => {
                if (team === player.team) {
                    return player
                }
            })

            let sortedList:Player[] = []
            if (positionNumber < 10) {
                // 타자는 포지션 순으로 정렬
                const orderByPosition = ['DH', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF']
                sortedList = playersDataByTeam.sort((a, b) => orderByPosition.indexOf(a.position) - orderByPosition.indexOf(b.position))
            } else {
                // 투수는 이름 순
                sortedList = playersDataByTeam.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    } else if (a.name > b.name) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }

            setPlayerList(sortedList)
            setSelectedIdx(0);
        }

    }, [teamList, team, selectedArea])

    // 선택된 player Func
    useEffect(() => {
        // console.log('select: ', playerList[selectedIdx]);

    }, [selectedIdx, playerList])

    useEffect(() => {

    }, [selectMode])


    return (
        <SelectContainer selected={selectedArea}>
            {selectedArea ?
                selectMode ?
                    <>
                        {/* <ChangeMode onClick={() => setSelectMode(!selectMode)}>search</ChangeMode> */}
                        <DropDownBox type='Year' state={year} setState={setYear} propList={yearList} width={20}/>
                        {!loadingFlag ?
                            <DropDownBox type='Team' state={team} setState={setTeam} propList={teamList} width={20}/>
                            :
                            <LoadingBox className={"dropdown"} $width={'120px'}><div className={'loading-data'} style={{backgroundColor: '#a8a8a8', width: '120px', height: '40px'}}/></LoadingBox>}
                        {!loadingFlag ?
                            <DropDownBox type='Player' state={player} setState={setPlayer} selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx} propList={playerList} width={30}/>
                            :
                            <LoadingBox className={"dropdown"} $width={'177px'}><div className={'loading-data'} style={{backgroundColor: '#a8a8a8', width: '177px', height: '40px'}}/></LoadingBox>}
                        {/* <ViewDetailStat /> */}
                        {Number(selectedArea.slice(4)) > 9 ? <AddPitcher onClick={addPlayer} /> : <AddBatter onClick={addPlayer} />}
                    </>
                    :
                    <>
                        <ChangeMode onClick={() => setSelectMode(!selectMode)}>list</ChangeMode>
                        <SearchBox />
                    </>
                :
                <SelectAreaHelp>선수 등록을 위해 영역을 선택해 주세요</SelectAreaHelp>
            }
        </SelectContainer>
    )
}
export default SelectPlayerContainer

const SelectContainer = styled.div<styleProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin-top: 25px;
    margin-bottom: 15px;
    margin-right: ${props => props.selected && '-50px'};
    position: relative;
    z-index: 1;
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

const AddBatter = styled.button`
    background: url(${addBatterButton}) no-repeat center center;
    background-size: contain;
    cursor: pointer;
    border: none;
    width: 53px;
    height: 32px;
    &:hover,
    &:focus {
        outline: none;
    }
`


const AddPitcher = styled.button`
    background: url(${addPitcherButton}) no-repeat center center;
    background-size: contain;
    cursor: pointer;
    border: none;
    width: 53px;
    height: 32px;
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

const LoadingBox = styled.div<styleProps>`
    display: flex;
    width: ${props => props.$width};
    height: 42px;
    align-items: center;
    justify-content: center;
    color: #BB2649;
`

const SelectAreaHelp = styled.div`
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    //color: #BB2649;
`