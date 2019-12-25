import React, {Component} from 'react'
//import { buildUrl } from 'react-instafeed';
import axios from 'axios';
import Loading from '../../UI/Loading';
import styles from './Hottest.module.css'; 



class Hottest extends Component {
    
    state = {
        instDataObject : [],
        loading: true,
        loaddingError: false,
        loaddingMessage: null
    
    }

    componentDidMount(){
        //const instUri = "https://api.instagram.com/v1/users/624059676/media/recent?access_token=624059676.1677ed0.cec7da6c5f1d4b8b8b2dc68258e31309&count=12"; 
        const instUri = "https://api.instagram.com/v1/users/6974393317/media/recent?access_token=6974393317.1677ed0.cae455253ae34dfcbbca5e59f4cc9a4c&count=50";
        this.setState({loading: true});
        axios.get(instUri)
            .then((jsonData)=> {this.setState({loading: false});
                                console.log('data Obj from ins:', jsonData);
                                console.log('data array ... ', jsonData.data.data);
                                this.setState({ instDataObject: jsonData.data.data}) })
                                .catch(err => {
                                    console.log("fetch instegram error: ", err.toString());
                                    this.setState({loaddingError: true, loading: false, loaddingMessage: err.toString()})
                                });
                                
       
    }
    
   render(){
    const loading = this.state.loading ? <Loading /> : null;
    const errorDisplayMessage = this.state.loaddingError ? <div>Oops, seems we have internal loading issue <br/>({this.state.loaddingMessage})</div> : null;
    const instagramGallery = this.state.instDataObject.map( (post) => { 
        const caption = (post.caption && post.caption.hasOwnProperty('text')) ? 
                        (<div className={styles.Caption} style={{width:'310px'}}>{post.caption.text.replace(/\#.*/ig,"")}</div>) : 
                        null;
        

        console.log('caption', caption);

        return (
            <div className={styles.box + ' md-col-3'} key={post.id}> 
                <div className={styles.Id}>{post.id.replace(/_.*/,"")}</div>        
                <a href={post.link} target="new"> 
                    <img src={post.images.low_resolution.url} style={{width:'310px'}}/>
                </a>
                {caption} 
            </div>
        )
    }); 
    return (
        <div>
            Hottest Collection .....
            {loading}
            {errorDisplayMessage}
            
            <div className="container">
               
                 <div className='row'>{instagramGallery}</div>
               

            </div>

        </div>
    )
}
}

export default Hottest;