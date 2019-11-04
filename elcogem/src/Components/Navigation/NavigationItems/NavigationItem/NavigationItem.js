import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as ActionTypes from '../../../../Store/actions';
import styles from './NavigationItem.module.css';

const NavigationItem = (props)=>{
    return (
        <li className={styles.NavigationItem}>
            <NavLink exact 
                     activeClassName={styles.active}  
                     to={props.link}
                     onClick={props.onNavItemClicked}>{props.children}</NavLink>
        </li>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onNavItemClicked : () => dispatch({type: ActionTypes.TOGGLE_SIDE_DRAWER})
    };
} 

export default connect(null, mapDispatchToProps)(NavigationItem);