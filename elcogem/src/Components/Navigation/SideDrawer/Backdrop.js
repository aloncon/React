import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = (props)=>{
    return (props.isOpen ? (<div className={styles.Backdrop} onClick={props.closeClick}></div>) : null);
}

export default Backdrop;