import React from 'react';
import Asset from '../hoc/Sources/Asset';
import styles from './Category.module.css';


const Category = (props) => {
    const imgSrc = 'images/' + props.id + '.jpg';
    return (<div className={styles.Main}>
        
        <div className={styles.Category}>
         <div className={styles.ImgText}>{props.name}</div>
            <Asset src={imgSrc} alt='ElcoGem'/>    
         </div>
        </div>
    );
}

export default Category;