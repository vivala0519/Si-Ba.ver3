import React, { useEffect, useState, DetailedHTMLProps, HTMLAttributes } from 'react'
import styled from 'styled-components'
import './ScoreBoard.css'

interface PropsType {
    showScoreBoard: boolean
    gameReportRow: object
    showPlayButton: boolean
    setShowPlayButton: React.Dispatch<React.SetStateAction<boolean>>
}
interface GameReportRow {
    topBottom?: string
    out?: number
}
interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    index?: number
    topBottom?: string
    on?: boolean
    show?: boolean
    halfOpacity?: boolean
}

const ScoreBoard = (props: PropsType) => {
    const { showScoreBoard, gameReportRow, showPlayButton, setShowPlayButton } = props
    const boardHead = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'R', 'H', 'B']
    const [awayRecord, setAwayRecord] = useState(['Away', '', '', '', '', '', '', '', '', '', '-', '-', '-', '0', '0', '0'])
    const [homeRecord, setHomeRecord] = useState(['Home', '', '', '', '', '', '', '', '', '', '-', '-', '-', '0', '0', '0'])
    const [outCount, setOutCount] = useState([false, false, false])

    const scoringFunc = (record, gameReportRow) => {
        const { inning, inningScore, totalScore, totalHit, totalBB } = gameReportRow
        // 이닝별 스코어
        if (record[inning] === '') {
            record[inning] = 0
        } else {
            record[inning] = inningScore ? inningScore : record[inning]
        }
        // R, H, B
        record[13] = totalScore ? totalScore : (record[13] ? record[13] : 0)
        record[14] = totalHit ? totalHit : (record[14] ? record[14] : 0)
        record[15] = totalBB ? totalBB : (record[15] ? record[15] : 0)
        return record
    }

    useEffect(() => {
        if (gameReportRow) {
            const { topBottom, out } = gameReportRow as GameReportRow
            // 아웃카운트 갱신
            if (out) {
                const tempOutCount = [false, false, false]
                for (let i = 0; i < out; i++) {
                    tempOutCount[i] = true
                }
                setOutCount(tempOutCount)
            }
            // 스코어보드 갱신
            if (topBottom === 'top') {
                const copiedRecord = [...awayRecord]
                const returnRecord = scoringFunc(copiedRecord, gameReportRow)
                setAwayRecord(returnRecord)
            } else if (topBottom === 'bottom') {
                const copiedRecord = [...homeRecord]
                const returnRecord = scoringFunc(copiedRecord, gameReportRow)
                setHomeRecord(returnRecord)
            }
        }

    },[gameReportRow])

    return (
        <>
            <OutCount className={showScoreBoard && 'show'}>
                {outCount.map((value, i) => (
                    <Out key={i} on={value} />
                ))}
            </OutCount>
            <ProcessBorder
                className={showScoreBoard && 'show'}
                topBottom={gameReportRow ? gameReportRow['topBottom'] : 'none'}
                halfOpacity={showPlayButton}
                show={showScoreBoard}
                onMouseEnter={() => showScoreBoard && setShowPlayButton(true)}
                onMouseLeave={() => showScoreBoard && setShowPlayButton(false)}
            >
                <Board>
                    {[boardHead, awayRecord, homeRecord].map((record, index) => (
                        <ColumnDiv key={index} index={index}>
                            {record.map((value, i) => (
                                <ScoreCell key={i} index={i}>
                                    {value}
                                </ScoreCell>
                            ))}
                        </ColumnDiv>
                    ))}
                </Board>
            </ProcessBorder>
        </>
    )
}

export default ScoreBoard

const ProcessBorder = styled.div<styleProps>`
    opacity: ${({ halfOpacity, show }) => (show ? (halfOpacity ? '0.2 !important' : '1') : '0')};
    //opacity: 0;
    --borderWidth: 5px;
    position: relative;
    border-radius: var(--borderWidth);
    z-index: revert;
    margin-bottom: 15px;

    &::after {
        content: '';
        position: absolute;
        top: calc(-1 * var(--borderWidth));
        left: calc(-1 * var(--borderWidth));
        height: calc(100% + var(--borderWidth) * 2);
        width: calc(100% + var(--borderWidth) * 2);
        background: ${props => {
            if (props?.topBottom === 'top') {
                return 'linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8)'
            } else if (props?.topBottom === 'bottom') {
                return 'linear-gradient(60deg, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)'
            } else {
                return 'linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)'
            }
        }};
        border-radius: calc(2 * var(--borderWidth));
        z-index: -1;
        animation: animatedgradient 3s ease alternate infinite;
        background-size: 300% 300%;
        filter: blur(5px);
    }
`

const Board = styled.div`
    position: relative;
    z-index: 3;
    display: flex;
    flex-direction: column;
    width: 575px;
    height: 124px;
    background: repeating-linear-gradient(to right, #3f3f3f, black 82%, #3f3f3f 18%);
    border: 3mm inset black;
    //margin-bottom: 15px;
    color: white;
    font-family: "Road Rage", sans-serif;
    font-weight: 400;
    font-style: normal;
`

const ColumnDiv = styled.div<styleProps>`
    display: flex;
    height: ${props => {
        if (props.index === 0) {
            return '30px';
        } else {
            return '35px';
        }
    }};
    font-family: "Road Rage", sans-serif;
    font-weight: 400;
    font-style: normal;
`

const ScoreCell = styled.div<styleProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    width: ${props => {
        if (props.index === 0) {
            return '60px'
        } else {
            return '34px'
        }
    }};
    font-family: "Road Rage", sans-serif;
    font-weight: 400;
    font-size: 25px;
    font-style: normal;
`

const OutCount = styled.div`
    opacity: 0;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    position: relative;
    width: 575px;
    z-index: 4;
    margin-bottom: 15px;
    padding-right: 10px;
`

const Out = styled.div<styleProps>`
    --borderWidth: 50%;
    border-radius: var(--borderWidth);
    width: 10px;
    height: 10px;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: calc(-1 * var(--borderWidth));
        left: calc(-1 * var(--borderWidth));
        height: calc(100% + var(--borderWidth) * 2);
        width: calc(100% + var(--borderWidth) * 2);
        background: linear-gradient(100deg, #ff0000, #ff0000, #ff0000, #FF2F2F, #FFC1C1, #FF2F2F, #ff0000, #ff0000, #ff0000);
        border-radius: calc(2 * var(--borderWidth));
        animation: animatedgradient 7s ease alternate infinite;
        background-size: 300% 300%;
        filter: blur(1px);
        opacity: ${props => {
            if (!props.on) {
                return '20%';
            }
        }
}
`
