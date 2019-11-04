import React from 'react';

import styles from './Category.module.css';


const Category = (props) => {
    const imgSrc = './images/' + props.id + '.jpg';
    return (<div className={styles.Main}>
        
        <div className={styles.Category}>
        <   div className={styles.ImgText}>{props.name}</div>
            <img src={imgSrc}/>
            
        </div>

    </div>);
}

export default Category;