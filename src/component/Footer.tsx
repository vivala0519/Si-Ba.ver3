import React, {useState, DetailedHTMLProps, HTMLAttributes} from 'react'
import styled from 'styled-components'
import panton from '../assets/panton.jpg'

interface PropsType {
    onReady: boolean
}

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    onReady?: boolean
    $show?: boolean
}
const Footer = (props: PropsType) => {
    const { onReady } = props
    const [showDescription, setShowDescription] = useState(false)
    const description = '테마: 최신 선수정보 시즌 2023'

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
                <YearsColour onMouseEnter={() => setShowDescription(true)} onMouseLeave={() => setShowDescription(false)}>
                    <Description $show={showDescription}>{description}</Description>
                </YearsColour>
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

const YearsColour = styled.div`
    background: url(${panton}) no-repeat center center;
    background-size: 100% 100%;
    width: 40px;
    height: 60px;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(3);
    }
`

const Description = styled.p<styleProps>`
    display: ${props => props.$show ? 'block' : 'none'};
    font-size: 5px;
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 600;
    width: 80px;
    position: absolute;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px;
    border-radius: 5px;
`;

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