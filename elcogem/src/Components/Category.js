import React, { useState, useEffect } from 'react';
import * as windowSize from '../Hooks/windowSize';
import Asset from '../hoc/Sources/Asset';
import styles from './Category.module.css';


const Category = (props) => {

    const getWidthType = (width) => {
        if(width >= 860)
            return '_800';
        if(width >= 660)
            return '_600';
        if(width >= 460)
            return '_400';

        return '';
    }

    const imgSrc = 'images/' + props.id + getWidthType(windowSize.useWindowWidth()) +'.jpg';
    return (<div className={styles.Main}>
        
        <div className={styles.Category}>

         <div className={styles.ImgText}>{props.name}</div>
            <Asset src={imgSrc} alt='ElcoGem'/>    
         </div>
        </div>
    );
}

export default Category;