import React, {Component} from 'react';
import {connect} from 'react-redux';
import Category from '../../Components/Category';
import PreContent from '../../Components/PreContent';
import * as ModuleInfo from '../../ModuleInfo/ModuleInfo';
import VideoGallery from '../VideoGallery/VideoGallery';
import GalleryT from '../VideoGallery/GalleryT';
import * as actionTypes from "../../Store/actions/actionsInstagram";

class Home extends Component {
    componentDidMount (){
        this.props.dispatch(actionTypes.loadMediaFromInstagramRequested());

    }

    render (){
        const imgWidth = '640';
        const videoWidth = '640';
        let videoArr  = [
            {
                original: '/_videos/bulk_3_'+imgWidth+'.jpg',
                thumbnail: '/_videos/bulk_3_320.jpg',
                embedUrl: '/_videos/bulk_640_3.mp4',
                //description: 'Render custom slides within the gallery',
                //renderItem: this._renderVideo.bind(this)
            },
            {
                original: '/_videos/bulk_2_'+imgWidth+'.jpg',
                thumbnail: '/_videos/bulk_2_150.jpg',
                embedUrl: '/_videos/bulk_640_2.mp4',
                //description: 'Render custom slides within the gallery',
                //renderItem: this._renderVideo.bind(this)
            },

        ];

        const videoArrAddition = this.props.instDataObjectFirst30
                                    .filter(post => (post.videos && post.videos.standard_resolution))
                                        .map( post =>
                                        {
            const caption = (post.caption && post.caption.hasOwnProperty('text')) ? post.caption.text.replace(/\#.*/ig,""): null;
            const postId = post.id.replace(/_.*/,"");

            if(post.videos && post.videos.standard_resolution){
                return ({
                    original: post.images.standard_resolution.url,
                    thumbnail: post.images.thumbnail.url,
                    embedUrl: post.videos.standard_resolution.url,
                    description: caption? caption : '' ,
                });
            }
        })


        videoArr = [...videoArrAddition, ...videoArr];

        let base = '';
        if(typeof this.props.baseSrc !== "undefined"){ 
         base = (window.location.href.indexOf('://localhost:') === -1) ? (`${this.props.baseSrc}/`)  : ''; 
        }

        return (
        <div className={'Home'}> 
            <PreContent />
            <div style={{width:'100%',textAlign:'center'}}>
                <h2>Check out our latest video collection</h2>
                <VideoGallery videosArr={videoArr} />
            </div>

            <Category id='ruby' name='Ruby' base={base}/>
            <Category id='sapphire' name='Sapphire' base={base}/>
            <Category id='emerald' name='Emerald' base={base}/>


        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        baseSrc : state.baseSrc,
        instDataObjectFirst30 : state.instagram.instDataObjectFirst30,

    };
}

export default connect(mapStateToProps, null)(Home);