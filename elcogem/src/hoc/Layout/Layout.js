import React, {Component} from 'react';
import * as actionTypes from '../../Store/actions/actionsTradeShows';
import { connect } from 'react-redux';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../Containers/Footer/Footer';

import styles from './Layout.module.css';

class Layout extends Component {

    state = ({
        showSideDrawer : false
    })

    toggleButtonHandler = () => {
        this.setState({
            showSideDrawer: this.state.showSideDrawer ? false: true
        })
    }
    
    toggleCloseHandler = () => {

        this.setState({
            showSideDrawer: false
        })
    }
    toggleOpenHandler = ()=> {
        this.setState({
            showSideDrawer: true
        })
    }


    render(){
        return (
            <div>
                <Toolbar onToggleClick={this.props.onToggleClick}/>
                
                <SideDrawer showSideDrawer={this.props.showSideDrawer}
                            onToggleClick={this.props.onToggleClick}/>         
               
                <main className={styles.Content}>

                    {this.props.children}
                </main>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        showSideDrawer: state.nav.showSideDrawer 
    };
}

const mapDispatchToProps = dispatch => {
   return { 
    onToggleClick : () => dispatch({type: actionTypes.TOGGLE_SIDE_DRAWER}),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);