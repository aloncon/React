import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Logo.module.css'

const Logo = ()=>(
    <div title='ElcoGem Co.' className={styles.Logo}>
        <Link to="/"><img src='./_images/elcoSmallLogo.jpg' alt='ElcoGem'/></Link>
    </div>

)

export default Logo;