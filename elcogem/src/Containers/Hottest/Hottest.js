import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import * as actionTypes from '../../Store/actions/actionsInstagram';
import Loading from '../../UI/Loading';
import styles from './Hottest.module.css';


class Hottest extends Component {
    
    state = {
    }
    searchParam = this.props.location.search.split('=')[1];
    componentDidMount(){
        //const searchParam = this.props.location.search.split('=')[1];
        const searchParam = this.searchParam;
        if(searchParam && searchParam.length > 0 )
            //this.props.dispatch(actionTypes.loadMediaFromInstagramForType(searchParam));
            this.props.dispatch(actionTypes.loadMediaFromInstagramPerTypeRequested(searchParam));
        else
            this.props.dispatch(actionTypes.loadMediaFromInstagramRequested());
    }
    
   render(){
    //const loading = this.state.loading ? <Loading /> : null;
    const loading = this.props.loading ? <Loading /> : null;
    const errorDisplayMessage = this.props.loaddingError ? <div>Oops, seems we have internal loading issue <br/>(<span style={{fontSize: '10px'}}>{this.props.loaddingMessage}</span>)</div> : null;
    const dataObject = (this.searchParam && this.searchParam.length>0) ? this.props.instDataObject : this.props.instDataObjectFirst30;
    const instagramGallery = dataObject.map( (post) => {

        const caption = (post.caption && post.caption.hasOwnProperty('text')) ?
                        (<div className={styles.Caption} style={{width:'310px'}}>{post.caption.text.replace(/\#.*/ig,"")}</div>) : 
                        null;
        const postId = post.id.replace(/_.*/,"");
        const linkId = post.link.replace(/.*\.com\//,"");
        return (
            <div className={styles.box + ' md-col-3'} key={post.id}> 
                <div className={styles.Id}>{postId}</div>
                <Link to={{
                    pathname: '/contact-us',
                    search: 'urlid='+linkId + '&itemid='+postId,
                }}  title={'Email US For More Info On This item'}><div className={styles.Email + ' fa fa-envelope-square'}></div></Link>
                <a href={post.link} target="new"> 
                    <img src={post.images.low_resolution.url} style={{width:'310px'}}/>
                </a>
                {caption} 
            </div>
        )
    }); 
    return (
        <div>
            <span className={styles.Caption}>Check out our collection on instagram</span>
            {loading}
            {errorDisplayMessage}
            
            <div className={["container", styles.Container].join(' ')}>
               
                 <div className='row' style={{justifyContent: 'space-evenly'}}>{instagramGallery}</div>
               

            </div>

        </div>
    )
 }
}

const mapStateToProps = (state)=>{
    return {
        instDataObjectFirst30 : state.instagram.instDataObjectFirst30,
        instDataObject : state.instagram.instDataObject,
        loading        : state.instagram.loading,
        loaddingError  : state.instagram.loaddingError ,
        loaddingMessage: state.instagram.loaddingMessage
    }

}

export default connect(mapStateToProps, null)(Hottest);