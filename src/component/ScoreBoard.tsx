import React, { useState, DetailedHTMLProps, HTMLAttributes } from 'react'
import styled from 'styled-components'

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    index: number
}

const ScoreBoard = () => {
    const boardHead = ['Team', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'R', 'H', 'B']
    const awayRecords = ['Away', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '-', '-', 0, 0, 0]
    const homeRecords = ['Home', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-', '-', '-', 0, 0, 0]

    return (
        <Board>
            {[boardHead, awayRecords, homeRecords].map((record, index) => (
                <ColumnDiv key={index} index={index}>
                    {record.map((value, i) => (
                        <ScoreCell key={i} index={i}>
                            {value}
                        </ScoreCell>
                    ))}
                </ColumnDiv>
            ))}
        </Board>
    )
}

export default ScoreBoard

const Board = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #232B55;
    width: 570px;
    height: 101px;
    margin-bottom: 15px;
    border: 1px solid #232B55;
    color: white;
`

const ColumnDiv = styled.div<styleProps>`
    display: flex;
    height: ${props => {
        if (props.index === 0) {
            return '30px';
        } else {
            return '35px';
        }
    }}
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
`