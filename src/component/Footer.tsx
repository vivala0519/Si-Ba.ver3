import {useState, DetailedHTMLProps, HTMLAttributes} from 'react'
import styled from 'styled-components'
import panton from '../assets/panton.jpg'

interface PropsType {
    onReady: boolean
}

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    $ready?: boolean
    $show?: boolean
}
const Footer = (props: PropsType) => {
    const { onReady } = props
    const [showNextUpdate, setShowNextUpdate] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    const nextUpdate = '- 병살타 케이스 추가\n- 연장전 추가'
    const description = '테마: 최신 선수정보 시즌 2023'

    return (
        <>
            <FooterContainer $ready={onReady}>
                <FooterEl>
                    <span
                        onMouseEnter={() => setShowNextUpdate(true)}
                        onMouseLeave={() => setShowNextUpdate(false)}
                        style={{position: "relative"}}
                    >
                        <NextUpdate $show={showNextUpdate}>{nextUpdate}</NextUpdate>
                        <Link style={{cursor: 'default'}}>업데이트 예정 ver.3.1</Link>
                    </span>
                    {/*GitHub*/}
                    <span>
                        Developed by. <Link href="https://github.com/vivala0519" target="_blank" rel="noopener noreferrer">Dzeko</Link>
                    </span>
                    {/*Velog*/}
                    <span>
                        Contact. <Link href="https://velog.io/@vivala0519/Si-Ba-ver.3-preface" target="_blank" rel="noopener noreferrer">vivala0519</Link>
                    </span>
                </FooterEl>
                {/*year's color*/}
                <YearsColour onMouseEnter={() => setShowDescription(true)} onMouseLeave={() => setShowDescription(false)}>
                    <Description $show={showDescription}>{description}</Description>
                </YearsColour>
            </FooterContainer>
            <CopyRight $ready={onReady}>
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
    margin-top: 50px;
    width: ${props => props.$ready ? '100%' : '100%'}
`

const FooterEl = styled.span`
    font-size: 12px;
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 400;
    color: #5a5a5a;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
        transform: scale(3) translateY(-20px) translateX(-15px);
    }
`

const NextUpdate = styled.p<styleProps>`
    display: ${props => props.$show ? 'block' : 'none'};
    font-size: 14px;
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 600;
    color: white;
    width: 135px;
    position: absolute;
    bottom: 62.5%;
    left: 57%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.9);
    padding: 5px;
    border-radius: 5px;
    white-space: pre;
    text-align: left;
    &::after {
        content: '';
        position: absolute;
        bottom: -38%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 10px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
    }
`;

const Description = styled.p<styleProps>`
    display: ${props => props.$show ? 'block' : 'none'};
    font-size: 5px;
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 600;
    color: black;
    width: 80px;
    position: absolute;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.9);
    padding: 5px;
    border-radius: 5px;
    @media (max-width: 821px) {
        left: 8%;
    }
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
    width: ${props => props.$ready ? '100%' : '100%'}
`