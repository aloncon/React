import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import * as windowSize from '../Hooks/windowSize';
import Asset from '../hoc/Sources/Asset';
import styles from './Category.module.css';


const Category = (props) => {
    const innerWinWidth = windowSize.useWindowWidth();
    const getWidthType = (width) => {
        if(width >= 860)
            return '_800';
        if(width >= 660)
            return '_600';
        if(width >= 460)
            return '_400';

        return '';
    }

    const imgSrc = '_images/' + props.id + getWidthType(innerWinWidth) +'.jpg';
    //const imgSrc = 'images/' + props.id + getWidthType(window.innerWidth) +'.jpg';

    return (<div className={styles.Main}>
        
        <div className={styles.Category}>

         <div className={styles.ImgText}>{props.name}</div>
            <Link to={{pathname: '/hottest-collection', search: 'type='+props.id}}><Asset src={imgSrc} alt={props.name}/></Link>
         </div>
        </div>
    );
}

export default Category;