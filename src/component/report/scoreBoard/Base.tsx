// import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import styled from 'styled-components'
import './ScoreBoard.css'
import {DetailedHTMLProps, HTMLAttributes} from "react";

interface PropsType {
    base: Array<number>
}

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    on?: number
    index?: number
}

const Base = (props: PropsType) => {
    const { base } = props
    return (
        <BaseContainer>
            <Bases>
                {base.map((value, i) => (
                    <BaseEl key={i} on={value} index={i} />
                ))}
            </Bases>
            <Infield />
        </BaseContainer>
    )
}

export default Base

const BaseContainer = styled.div`
    position: absolute;
    top: -15px;
`

const Bases = styled.div`
    display: flex;
    gap: 18px;
    flex-direction: row-reverse;
    position: relative;
    left: 15px;
    z-index: 1;
`

const BaseEl = styled.div<styleProps>`
    position: relative;
    width: 17px;
    height: 17px;
    animation: rotateAnimation 5s linear infinite;
    border: ${props => {
        if (props.on) {
            return '4px outset black';
        } else {
            return '5px outset rgba(0, 0, 0, 0.3)';
        }
    }};
    background-color: ${props => {
        if (props.on) {
            return 'greenyellow';
        } else {
            return 'white';
        }
    }};
    top: ${props => {
        if (props.index === 1) {
            return '-35px';
        }
    }}
}
`

const Infield = styled.div`
    position: absolute;
    z-index: 0;
    left: 30px;
    top: -20px;
    width: 60px;
    height: 60px;
    rotate: 45deg;
    overflow: hidden;
    
    &::before {
        content: "";
        position: absolute;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        background: conic-gradient(transparent, greenyellow, #00700B, transparent 100%);
        animation: rotate 1.5s linear infinite;
    }

    &:after {
        content: "";
        position: absolute;
        top: 6px;
        left: 6px;
        right: 6px;
        bottom: 6px;
        background: #fff;
    }
`