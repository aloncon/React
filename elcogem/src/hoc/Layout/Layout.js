import React, {Component} from 'react';
import * as actionTypes from '../../Store/actions';
import { connect } from 'react-redux';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

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
                 <footer className={styles.Footer}>
                     <div className={styles.FooterSeperator}><img src='./images/gem_line.jpg'/></div>
                     <div className={styles.FooterInner}> 
                      <p><strong>Get Connected</strong> <br/>
                         Follow us online for specials and more! <br/>
                         Face | Twi | Iins | </p>
                      <p>Copyright 2019 © ElcoGem Co. - Since 1985, All Rights Reserved.</p>
                     </div>
                 </footer> 
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        showSideDrawer: state.showSideDrawer 
    };
}

const mapDispatchToProps = dispatch => {
   return { 
    onToggleClick : () => dispatch({type: actionTypes.TOGGLE_SIDE_DRAWER}),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);