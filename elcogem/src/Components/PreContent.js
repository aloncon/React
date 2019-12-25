import React, { useState, useEffect} from 'react';
import * as ModuleInfo from '../ModuleInfo/ModuleInfo';
import * as windowSize from '../Hooks/windowSize';
import Asset from '../hoc/Sources/Asset';
import styles from './PreContent.module.css';
//import styles from ''

const PreContent = () => {
    const getWidthType = (width) => {
        if(width >= 460)
            return '_400';
        if(width >= 360)
            return '_300';

        return '_200';
    }
    const imageSrc = windowSize.useWindowWidth() > 600 ? 'ruby_bulk_192.jpg' : 'clean_folwer'+getWidthType(windowSize.useWindowWidth())+'.jpg';
    return (
    <div className={styles.preContentDiv}>
       <Asset src={`images/${imageSrc}`}/>
        { /*<Asset className={styles.mobile} src='images/ruby_bulk_300.jpg'/> */ }
      <p>Established in the year 1985, Elco Gem Co. is a top class exporter of exclusive variety of Emerald,
          Ruby, Sapphire and other Semi-Precious Stones. </p>
        <p>
        We possess a wide variety of gemstones in different sizes and features. 
            We specialize in faceted, calibrated as well as cabochon. </p>

        <p>Our products have been highly acclaimed by our clients for their unmatched quality,
        designs and finishing.</p>
        
    </div>);
}

export default PreContent;