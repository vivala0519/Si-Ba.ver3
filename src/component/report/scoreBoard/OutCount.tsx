import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styled from 'styled-components'
import './ScoreBoard.css'

interface PropsType {
    showScoreBoard: boolean
    outCount: Array<boolean>
}

interface styleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    $on?: boolean
}

const OutCount = (props: PropsType) => {
    const { showScoreBoard, outCount } = props
    return (
        <OutCountainer className={showScoreBoard && 'show'}>
            {outCount.map((value, i) => (
                <OutEl key={i} $on={value} />
            ))}
        </OutCountainer>
    )
}

export default OutCount

const OutCountainer = styled.div`
    opacity: 0;
    display: flex;
    justify-content: flex-start;
    gap: 11px;
    position: relative;
    width: 100%;
    z-index: 4;
    margin-bottom: 15px;
    left: 21px;
    top: 44px;
    @media (max-width: 821px) {
        left: 6.3%;
        top: 39.5px;
        gap: 9px;    
    }
`

const OutEl = styled.div<styleProps>`
    --borderWidth: 50%;
    border-radius: var(--borderWidth);
    width: 6px;
    height: 6px;
    position: relative;

    @media (max-width: 821px) {
        width: 4px;
        height: 4px;
    }

    &::after {
        content: '';
        position: absolute;
        top: calc(-1 * var(--borderWidth));
        left: calc(-1 * var(--borderWidth));
        height: calc(100% + var(--borderWidth) * 2);
        width: calc(100% + var(--borderWidth) * 2);
        background: linear-gradient(100deg, #ff0000, #ff0000, #ff0000, #FF2F2F, #FFC1C1, #FF2F2F, #ff0000, #ff0000, #ff0000);
        border-radius: calc(2 * var(--borderWidth));
        animation: rotateGradient 5s ease alternate infinite;
        background-size: 300% 300%;
        filter: blur(1px);
        opacity: ${props => {
            if (!props.$on) {
                return '20%';
            }
        }
    }
`
