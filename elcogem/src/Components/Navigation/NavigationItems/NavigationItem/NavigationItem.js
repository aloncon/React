import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ActionTypes from '../../../../Store/actions/actions';
import styles from './NavigationItem.module.css';

const NavigationItem = (props)=>{
    const link  = props.link;  // (window.location.href.indexOf('://localhost:') === -1) ? (`/new${props.link}`)  : props.link; 
    //console.log("baseSrc ...",props.baseSrc);
    return (
        <li className={styles.NavigationItem}>
            <NavLink 
                     activeClassName={styles.active}  
                     to={link}
                     onClick={props.onNavItemClicked}>{props.children}</NavLink>
        </li>
    );
}

const mapStateToProps = state => {
    return {
        baseSrc : state.baseSrc
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onNavItemClicked : () => dispatch({type: ActionTypes.TOGGLE_SIDE_DRAWER})
    };
} 

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItem);