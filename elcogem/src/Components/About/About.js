import React from 'react';
import styles from './About.module.css'

const About = () => {
    return (
        <div className={styles.About}>
			<p><b>Elco gem co.</b> specializesin a variety of calibrated and single gemstones.</p>
			<p>Elco Gem is an importer of top quality Zambian and Columbian Emerald, Burmese Ruby, Ceylon
			 Sapphire (blue, yellow, and pink).						
			</p>
			<p>In addition to the fine
line of loose stones, Elco Gem maintains an extensive matching pairs inventory with consistency on the quality.</p>
			<p>Elco gem is a member of American Gem Trade Association – A.G.T.A</p>
			<p>When you need a gemstone, be sure you can trust our shipping availability as well as 
               the quality of the gem you purchase. Our service includes overnight delivery in the U.S.</p>
			
            <div>
                <b>Trust our quality and service:</b><br/><br/>
                <div className={styles.contactBox}>   
                        <span>New-York, NY 10036</span><br/>
                    <span>212-730-6547 Toll Free: 800-elco-gem</span><br/>
                    <span>Fax: 212-730-7746</span><br/>
                    <span>elcogem@aol.com</span><br/>
                </div>
            </div>
            
        </div>
    );
}

export default About;