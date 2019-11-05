import React from 'react';
import * as ModuleInfo from '../ModuleInfo/ModuleInfo';
import Asset from '../hoc/Sources/Asset';
const PreContent = () => {

    return (<div style={{padding:'20px 0'}}>
       <Asset  style={{float:'right',padding:'0',boxShadow: '3px 3px 5px 6px #ccc'}} 
               src='images/ruby_bulk_192.jpg'/> 
     <p>Established in the year 1985, Elco Gem Co. is a top class exporter of exclusive variety of Emerald, 
        Ruby, Sapphire and other Semi-Precious Stones. 
        We possess a wide variety of gemstones in different sizes and features. 
        We specialize in faceted, calibrated as well as cabochon. 
        Our products have been highly acclaimed by our clients for their unmatched quality, 
        designs and finishing.</p>
        
    </div>);
}

export default PreContent;