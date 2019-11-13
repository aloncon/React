import React from 'react';
import loadingGif from './images/general/flower.gif';
import { blockStatement } from '@babel/types';

const Loading = () => {
    return <div style={{width: "70px", margin: "auto"}}><img src={loadingGif} alt="loading"/></div>
}

export default Loading;