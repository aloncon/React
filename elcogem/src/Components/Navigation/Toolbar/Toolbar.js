import React from 'react';
import styles from './Toolbar.module.css'; 
import Navigation from '../NavigationItems/NavigationItems';
import Logo from '../../../Components/Logo/Logo';
import DrawerToggle from '../../Navigation/DrawerToggle/DrawerToggle';

const Toolbar = (props)=>{
    return (
        <header className={styles.Toolbar}>
           <div className={styles.ToolbarTop}> 
            <DrawerToggle onToggleClick={props.onToggleClick}/>
            <div className={styles.Logo}><Logo /></div>
            <div title='ElcoGem Co' className={styles.TextWrapper}>
             <h2>ElcoGem Co.</h2>
             <h3>NEW YORK</h3>
            </div>
            </div> 
            <nav className={styles.DesktopOnly}>
                <Navigation />
             </nav>
              

        </header>);
}

export default Toolbar;