import React from 'react';
import Aux from '../../hoc/Aux_';
import styles from './Input.module.css';

const Input = (props) => {
    const classNameList = props.iType==='textarea'? [styles.TextAreaElement] : [styles.InputElement];
    //console.log('props.isValid', props.isValid)
    if(!props.isValid && props.isTouched){
        classNameList.push(styles.Invalid);
    }
    let inputElelment = null;
    switch(props.iType){
        case "textarea":
        inputElelment = (<textarea rows="4" cols="60" 
                                type={props.iType} 
                                value={props.iValue} 
                                onChange={props.iOnChange}
                                className={classNameList.join(' ')} required/>);    
        break;
        case "text":
        inputElelment = (<input type={props.iType} 
                                value={props.iValue} 
                                onChange={props.iOnChange}
                                className={classNameList.join(' ')} required/>);    
        break;

        default:
                inputElelment = (<input type={props.iType} 
                                value={props.iValue} 
                                onChange={props.iOnChange}
                                className={classNameList.join(' ')} required/>);    
        break;
    }
    return (
        <Aux>
                    {inputElelment}
        </Aux>

    )
}

        {/* 
        <input type={props.iType} 
               value={props.iValue} 
               onChange={props.iOnChange}
               className={classNameList.join(' ')} required/>            
        */}        


export default Input;
