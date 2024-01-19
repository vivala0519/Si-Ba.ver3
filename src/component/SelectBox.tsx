import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Player {
    team: string;
    position: string;
    name: string;
}

interface BoxProps {
    width: number
    state?: string
    setState?: React.Dispatch<React.SetStateAction<string>>
    setSelectedIdx?: React.Dispatch<React.SetStateAction<number>>
    propList?: Array<string | Player>
    type?: string
}

const SelectBox = (props:BoxProps) => {
    const {propList, setState, setSelectedIdx, width, state, type} = props;
    type optionList = React.ReactElement<{key: number, value: string}, "option">;
    const [listElement, setListElement] = useState<optionList[] | undefined>([]);

    useEffect(() => {
        if (type === 'player') {
            const playersDisplayTextList = (propList || []).filter((player): player is Player => typeof player !== 'string').map((player: Player) => {
                return `${player.position !== 'P' ? player.position : ''} ${player.name}`;
            });            
            setListElement(playersDisplayTextList?.map((el, idx) => <option key={idx}>{el}</option>));
        } else {
            //@ts-expect-error: must string
            setListElement(propList?.map((el, idx) => <option key={idx}>{el}</option>))
        }
    }, [propList])

    const selectHandler = (event) => {
        if (type === 'player') {
            setSelectedIdx?.(event.target.selectedIndex);
        }
        setState?.(event.target.value);
    }

    return (
        <>
            <Box value={state} width={width} onChange={(event) => selectHandler(event)}>
                {listElement}
            </Box>
        </>
    )
}
export default SelectBox

const Box = styled.select<BoxProps>`
    text-align: center;
    width: ${props => props.width || 100}px;
    height: 30px;
`