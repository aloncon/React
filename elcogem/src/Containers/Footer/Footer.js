import React , {Component} from 'react';
import {Link} from 'react-router-dom';

import styles from '../../hoc/Layout/Layout.module.css';

class Footer extends Component {
    render(){
        return (
            <footer className={styles.Footer}>
                <div className={styles.FooterSeperator}><img src='./_images/gem_line_mobile.jpg'/></div>
                <div className={styles.FooterInner}>
                    <div className={styles.IconRow}>
                     <div className={styles.IconRowItem}>
                        <p style={{width: '230px'}}>
                            <span className={styles.InnerTitle}>SOCIAL</span>
                            <a href="https://www.instagram.com/elcogem/" className="fa fa-instagram" target="_blank"></a>
                            <a href="https://www.facebook.com/ELCOGEM/?" className="fa fa-facebook" target="_blank"></a>
                            <a href="#" className="fa fa-linkedin" target="_blank"></a>

                        </p>
                     </div>
                     <div className={styles.IconRowItem}>
                            <p style={{width: '60px'}}>
                                &#160;
                            </p>
                     </div>
                     <div className={styles.IconRowItem}>
                        <p>
                            <span className={styles.InnerTitle}>Email us</span>
                            <Link to="/contact-us" className="fa fa-envelope"></Link>
                        </p>
                     </div>
                    </div>


                    <p className={styles.Copyright}>Copyright 2019 © ElcoGem Co. - Since 1985, All Rights Reserved.</p>
                </div>
            </footer>

        );
    }
}

export default Footer;