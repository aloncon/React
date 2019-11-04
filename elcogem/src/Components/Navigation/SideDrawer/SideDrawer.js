import React from 'react'
import Logo from '../../Logo/Logo';
import styles from './SideDrawer.module.css';
import Backdrop from './Backdrop';
import Aux from '../../../hoc/Aux_';
import Navigation from '../NavigationItems/NavigationItems'; 

const SideDrawer = (props) => {
    //const sideDrawer = props.showSideDrawer ? (<div className={styles.SideDrawer}>SideDrawer</div>) : null;  
    const styleClass = [];
    styleClass.push(styles.SideDrawer);
    if(props.showSideDrawer)
     styleClass.push(styles.Open);
    else
     styleClass.push(styles.Close);
     

    return (
        <Aux>
            <Backdrop isOpen={props.showSideDrawer}
                      closeClick={props.onToggleClick} /> 
            <div className={styleClass.join(' ')}
                 >
               
                <Logo />
                <nav>
                <Navigation/>
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;