import React, { useState, DetailedHTMLProps, HTMLAttributes } from 'react'
import styled from 'styled-components'
import './ScoreBoard.css'

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    index: number
}

const ScoreBoard = () => {
    const boardHead = ['Team', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'R', 'H', 'B']
    const awayRecords = ['Away', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '-', '-', 0, 0, 0]
    const homeRecords = ['Home', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '-', '-', 0, 0, 0]

    return (
        <ProcessBorder topBottom={gameReportRow ? gameReportRow['topBottom'] : 'none'} className={ showScoreBoard ? 'show' : ''}>
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
    )
}

export default ScoreBoard

const ProcessBorder = styled.div<styleProps>`
    opacity: 0;
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
        //background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
        border-radius: calc(2 * var(--borderWidth));
        z-index: -1;
        animation: animatedgradient 3s ease alternate infinite;
        background-size: 300% 300%;
        filter: blur(5px);
    }
`

const Board = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #232B55;
    width: 570px;
    height: 101px;
    margin-bottom: 15px;
    border: 1px solid #232B55;
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