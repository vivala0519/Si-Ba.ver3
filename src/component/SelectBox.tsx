import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface BoxProps {
    width: number
    state?: string
    setState?: React.Dispatch<React.SetStateAction<string>>
    propList?: Array<string>
}

const SelectBox = (props:BoxProps) => {
    const {propList, setState, width, state} = props;
    type optionList = React.ReactElement<{key: number, value: string}, "option">;
    const [listElement, setListElement] = useState<optionList[] | undefined>([]);
    
    useEffect(() => {
        setListElement(propList?.map((el, idx) => <option key={idx}>{el}</option>))
    }, [propList])

    return (
        <>
            <Box value={state} width={width} onChange={(event) => setState?.(event.target.value)}>
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