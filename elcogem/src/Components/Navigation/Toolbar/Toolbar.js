import React, { useState, useEffect } from 'react';
import styles from './Toolbar.module.css';
import './sticky.css';
import Navigation from '../NavigationItems/NavigationItems';
import Logo from '../../../Components/Logo/Logo';
import DrawerToggle from '../../Navigation/DrawerToggle/DrawerToggle';

const Toolbar = (props)=>{
    useEffect(()=>{
        const navBarHeader = document.getElementById('topNavBarHeader');
        const navBar = document.getElementById('topNavBarDesktopNav');
        const myFunction = ()=>{
            const sticky = navBar.offsetTop;
            let toolbarOffset = window.pageYOffset;
            console.log('myFunction', window.pageYOffset, 'toolbaOfset: ', toolbarOffset, ' Sticky navbar ofsettop: ', sticky);
            if(toolbarOffset > (sticky)){
                navBarHeader.classList.add('Sticky');
            }else{
                navBarHeader.classList.remove('Sticky');
            }
        }
        window.onscroll = ()=>{
            myFunction();
        }

    },[])

    return (
        <header className={styles.Toolbar} id="topNavBarHeader">
           <div className={styles.ToolbarTop} id="topToolbarTop">
            <DrawerToggle onToggleClick={props.onToggleClick}/>
            <div className={styles.Logo} id="topLogo"><Logo /></div>
            <div title='ElcoGem Co' className={styles.TextWrapper} id="topTextWrapper">
             <h2>ElcoGem Co.</h2>
             <h3>NEW YORK</h3>
            </div>
            </div> 
            <nav className={styles.DesktopOnly} id="topNavBarDesktopNav">
                <Navigation />
             </nav>
              

        </header>);
}

export default Toolbar;