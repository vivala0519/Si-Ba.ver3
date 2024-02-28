// import { useEffect, useState } from 'react'
import styled from 'styled-components'

// interface BoxProps {
// }

const SearchBox = () => {
    // const {propList, setState, width, state} = props;

    return (
        <>
            <SearchPlayer />
        </>
    )
}
export default SearchBox

const SearchPlayer = styled.input`
    type: text;
    text-align: center;
    height: 30px;
    width: 200px;
    border: 2px solid #BB2649;
    border-radius: 50% 20% / 10% 40%;
`