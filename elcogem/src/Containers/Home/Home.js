import React, {Component} from 'react';
import {connect} from 'react-redux';
import Category from '../../Components/Category';
import PreContent from '../../Components/PreContent';
import * as ModuleInfo from '../../ModuleInfo/ModuleInfo';


class Home extends Component {
    render (){
        let base = '';
        if(typeof this.props.baseSrc !== "undefined"){ 
         base = (window.location.href.indexOf('://localhost:') === -1) ? (`${this.props.baseSrc}/`)  : ''; 
        }

        return (
        <div className={'Home'}> 
            <PreContent />
            <Category id='ruby' name='Ruby' base={base}/>
            <Category id='sapphire' name='Sapphire' base={base}/>
            <Category id='emerald' name='Emerald' base={base}/>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        baseSrc : state.baseSrc
    };
}

export default connect(mapStateToProps, null)(Home);