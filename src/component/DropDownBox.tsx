import React, { useState, useEffect } from 'react';
import './DropDownBox.css'

interface Player {
    team: string;
    position: string;
    name: string;
}

interface BoxProps {
    width: number
    state?: string
    setState?: React.Dispatch<React.SetStateAction<string>>
    selectedIdx?: number
    setSelectedIdx?: React.Dispatch<React.SetStateAction<number>>
    propList?: Array<string | Player>
    type?: string
}

const DropDownBox = (props: BoxProps) => {
    const {propList, state, setState, selectedIdx, setSelectedIdx, width, type} = props;
    type optionList = React.ReactElement<{key: number, value: string}, "option">;
    const [listElement, setListElement] = useState<optionList[] | undefined>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [haveText, setHaveText] = useState("");

    useEffect(() => {
        // console.log(state);
        
    }, [state])
    
    useEffect(() => {
        if (type === 'Player' && propList.length > 0) {
            const player = propList?.[selectedIdx] as Player | undefined;
            const displayText = `${player.position !== 'P' ? player.position : ''} ${player.name}`;
            if (displayText) {
                setState(displayText)
            }
        }
        
    }, [selectedIdx, propList])

    useEffect(() => {
        if (type === 'Player') {
            const playersDisplayTextList = (propList || []).filter((player): player is Player => typeof player !== 'string').map((player: Player) => {
                return `${player.position !== 'P' ? player.position : ''} ${player.name}`;
            });            
            setListElement(playersDisplayTextList?.map((el, idx) => <span key={idx}>{el}</span>));
        } else {
            //@ts-expect-error: must string
            setListElement(propList?.map((el, idx) => <span key={idx}>{el}</span>))
        }
    }, [propList])

    const selectHandler = (event, idx) => {
        if (type === 'Player') {
            setSelectedIdx?.(idx);
        }
        setHaveText(event.currentTarget.textContent);
        setState?.(event.currentTarget.textContent);
    }

    const itemList = (props) => {
        const list = props.map((item, idx) => (
        <div
            onClick={(event) => selectHandler(event, idx)}
            className="dropdownItem"
            key={idx}>
            {item}
        </div>
        ));

        return (
        <div className="dropdownItems"> {list} </div>
        );
    }

    return (
        <div
            className={isOpen ? "dropdown active" : "dropdown"}
            onClick={() => setIsOpen(!isOpen)}
            style={{width: width + '%', top: isOpen && listElement.length < 7 ? '138px' : (isOpen ? '145px': '0px')}}
         >
        <div className="dropdownText">
            {state ? state : haveText}
        </div>
        {itemList(listElement)}
        </div>
    );
}

export default DropDownBox;