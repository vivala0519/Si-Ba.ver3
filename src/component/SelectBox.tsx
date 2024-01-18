import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface BoxProps {
    width: number
    state?: string
    setState?: React.Dispatch<React.SetStateAction<string>>
    setSelectedIdx?: React.Dispatch<React.SetStateAction<number>>
    propList?: Array<string>
    type?: string
}

const SelectBox = (props:BoxProps) => {
    const {propList, setState, setSelectedIdx, width, state, type} = props;
    type optionList = React.ReactElement<{key: number, value: string}, "option">;
    const [listElement, setListElement] = useState<optionList[] | undefined>([]);
    // const [selectedIdx, setSelectedIdx] = useState<number>(0);

    useEffect(() => {
        if (type === 'player') {
            console.log(propList);
            const playersDisplayTextList = propList.map(player => {
                return `${player.position} ${player.name}`
            });
            setListElement(playersDisplayTextList?.map((el, idx) => <option key={idx}>{el}</option>));
        } else {
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