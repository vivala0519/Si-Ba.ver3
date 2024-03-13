import {useState, DetailedHTMLProps, HTMLAttributes} from 'react'
import styled from 'styled-components'
import styles from './Title.module.scss'
import homeIcon from '../assets/home-icon.png'

interface PropsType {
    onReady: boolean
}

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    $ready?: boolean
    $hover?: boolean
}

const Header = (props: PropsType) => {
    const { onReady } = props

    const [hoverTitle, setHoverTitle] = useState(false)

    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <HeaderContainer $ready={onReady}>
            <Title className={styles.title} onClick={handleRefresh} onMouseEnter={() => setHoverTitle(true)} onMouseLeave={() => setHoverTitle(false)}>
                <TitleSpan $hover={hoverTitle}>야구</TitleSpan>
                <TitleSpan $hover={hoverTitle}>놀자</TitleSpan>
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
    margin-bottom: 120px;
    left: 10px;
    width: ${props => props.$ready ? '100%' : '100%'}
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
    
    &:hover {
        &::before {
            background-image: url(${homeIcon});
            background-position: center;
            background-repeat: no-repeat;
        }
    };
`

const TitleSpan = styled.span<styleProps>`
    display: ${props => props.$hover ? 'none' : 'block'};
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