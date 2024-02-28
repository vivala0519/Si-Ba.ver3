import React, {DetailedHTMLProps, HTMLAttributes} from 'react'
import styled from 'styled-components'
import panton from '../assets/panton.jpg'

interface PropsType {
    onReady: boolean
}

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    onReady?: boolean
}
const Footer = (props: PropsType) => {
    const { onReady } = props

    return (
        <>
            <FooterContainer onReady={onReady}>
                <FooterEl>
                    {/*GitHub*/}
                    <span>
                        Developed by.<Link href="https://github.com/vivala0519" target="_blank" rel="noopener noreferrer">Dzeko</Link>
                    </span>
                    {/*Velog*/}
                    <span>
                        Contact.<Link href="https://velog.io/@vivala0519/Si-Ba-ver.3-preface" target="_blank" rel="noopener noreferrer">vivala0519</Link>
                    </span>
                </FooterEl>
                {/*year's color*/}
                <YearsColour />
            </FooterContainer>
            <CopyRight onReady={onReady}>
                {/*Copyright*/}
                Copyright 2024 Dzeko. All rights reserved.
            </CopyRight>
        </>
    )
}

export default Footer

const FooterContainer = styled.div<styleProps>`
    display: flex;
    gap: 10px;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 20px;
    width: ${props => props.onReady ? '720px' : '580px'}
`

const FooterEl = styled.span`
    font-size: 12px;
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 400;
    color: #5a5a5a;
    display: flex;
    flex-direction: column;
`

const Link = styled.a`
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 700;
    color: darkslateblue;
    cursor: pointer;
`

const YearsColour = styled.img`
    background: url(${panton}) no-repeat center center;
    background-size: 100% 100%;
    width: 40px;
    height: 60px;
`

const CopyRight = styled.span<styleProps>`
    font-size: 12px;
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 400;
    color: #5a5a5a;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    width: ${props => props.onReady ? '720px' : '580px'}
`