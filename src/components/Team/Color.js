import React, {useState} from 'react';
import ColorSelector from 'react-color-selector';


const Color = () => {
    let [myColor, pickedColor] = useState('');
    let picker_data = {
        col: 12,
        row: 12,
        width: 300,
        height: 250,
        view: 'both', 
        theme: 'dark',
        title:'COLORS',
        cellControl:4
    }
    return (
       <>
        <ColorSelector pallet={picker_data} selectedColor={pickedColor} />
        <p>{myColor}</p>
       </>
    )
}
export default Color;