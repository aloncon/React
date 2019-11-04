import React, {Component} from 'react';
import Category from '../../Components/Category';
import PreContent from '../../Components/PreContent';


class Home extends Component {
    render (){
        return (
        <div className={'Home'}> 
            <PreContent />
            <Category id='ruby' name='Ruby' />
            <Category id='sapphire' name='Sapphire' />
            <Category id='emerald' name='Emerald' />
        </div>
        );
    }
}

export default Home;