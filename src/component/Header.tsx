import {DetailedHTMLProps, HTMLAttributes} from 'react'
import styled from 'styled-components'
import styles from './Title.module.scss'
import icon from '../assets/home-icon.jpg'

interface PropsType {
    onReady: boolean
}

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    $ready?: boolean
}

const Header = (props: PropsType) => {
    const { onReady } = props

    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <HeaderContainer $ready={onReady}>
            <Title className={styles.title} onClick={handleRefresh}>
                <span>야구</span>
                <span>놀자</span>
            </Title>
            <SubTitle><YearColor>Si</YearColor>mulator of <YearColor style={{marginLeft: '5px'}}>Ba</YearColor>seball</SubTitle>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div<styleProps>`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 120px;
    left: 10px;
    width: ${props => props.$ready ? '720px' : '580px'}
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #5a5a5a;
    width: 80px;
    height: 80px;
    & > * {
        //font-family: "Giants-Inline", serif;
        //font-family: "HeirofLightBold", serif;
        font-family: "KBO-Dia-Gothic_bold", serif;
        font-style: normal;
        font-size: 25px;
        font-weight: 300;
    };
    
    &::before {
        background: url(${icon}) no-repeat center center;
        background-size: 100% 100%; 
    }
`

const SubTitle = styled.div`
    font-size: 15px;
    //font-family: "Giants-Inline", serif;
    //font-family: "HeirofLightBold", serif;
    //font-family: "KBO-Dia-Gothic_bold", serif;
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 400;
    position: absolute;
    left: 90px;
    top: 46px;
`

const YearColor = styled.span`
    font-size: 20px;
    //font-family: "Giants-Inline", serif;
    //font-family: "HeirofLightBold", serif;
    //font-family: "KBO-Dia-Gothic_bold", serif;
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 400;
    color: #BB2649;
    position: relative;
    top: 1px;
`