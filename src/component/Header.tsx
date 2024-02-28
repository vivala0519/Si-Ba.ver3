import React from 'react'
import styled from 'styled-components'
import styles from './Title.module.scss'

const Header = () => {
    return (
        <HeaderContainer>
            <Title className={styles.title}>
                <span>야구</span>
                <span>놀자</span>
            </Title>
            <SubTitle><YearColor>Si</YearColor>mulator of <YearColor style={{marginLeft: '5px'}}>Ba</YearColor>seball</SubTitle>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 120px;
    left: 10px;
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 400;
    color: #5a5a5a;
    width: 80px;
    height: 80px;
    border: 1px solid #BB2649;
`

const SubTitle = styled.div`
    font-size: 24px;
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 400;
    position: absolute;
    left: 90px;
    top: 47px;
`

const YearColor = styled.span`
    font-size: 24px;
    font-family: "Hahmlet", serif;
    font-style: normal;
    font-weight: 400;
    color: #BB2649;
`