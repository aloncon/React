import React from 'react';
import styles from './DrawerToggle.module.css';

const DrawerToggle = (props) => {
    return (
    <div className={styles.DrawerToggleWrapper} onClick={props.onToggleClick}>
        <div className={styles.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>    
    );

}

export default DrawerToggle;