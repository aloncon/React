import React from 'react'
import styles from './ContactInfo.module.css';

const ContactInfo = () => {
    return (
        <div className={styles.ContactInfoMain}>
            <div className={styles.Head}>CONTACT US</div>
            <div className={styles.Body}>
               <p>580 5th Ave Suite 2214 New York N.Y 10036</p>
               <div className={styles.Table}>  
                <ul className={styles.Table_UL}>
                    <li>Tel: 212-730 65 47</li>
                    <li>1800-ELCO-GEM</li>
                </ul>
                </div> 
            </div>
            
        </div>
    )
}

export default ContactInfo;
