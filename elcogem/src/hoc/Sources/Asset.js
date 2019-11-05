import React from 'react';
import * as ModuleInfo from '../../ModuleInfo/ModuleInfo';

Object.freeze(ModuleInfo);

const Asset = ({...props}) => {
    //const src = ModuleInfo.getScriptURL.absolutizeSrc(props.path);
    return (
        <img {...props}/>
    )
}

export default Asset;