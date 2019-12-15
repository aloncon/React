import React from 'react';

const Select = (props)=>{
    let listOfOptionsArr = [];
    console.log("Select Props", props.minSize, props.maxSize, props.selected);
    for (let i= +props.minSize; i < +props.maxSize; i++){
        listOfOptionsArr.push(<option key={i} value={i}>{i}</option>);
    }
    return (
        <select onChange={props.change} id={props.type} defaultValue={props.selected}>
            {listOfOptionsArr}
        </select>
    );    
}

export default Select;