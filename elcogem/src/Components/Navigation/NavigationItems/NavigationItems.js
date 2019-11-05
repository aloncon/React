import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const NavigationItems = (props)=>{
    return (
        <div className={styles.NavigationItems}>
            <ul>
                <NavigationItem  link={'home'}>Home</NavigationItem>
                <NavigationItem  link={'about'}>About</NavigationItem>
                <NavigationItem  link={'trade-shows'}>Trade Shows</NavigationItem>
                <NavigationItem  link={'hottest-collection'}><i>Collection From Media</i></NavigationItem>
                <NavigationItem  link={'contact-us'}>Contact Us</NavigationItem>
              
            </ul>
        </div>
    );

}

export default NavigationItems;