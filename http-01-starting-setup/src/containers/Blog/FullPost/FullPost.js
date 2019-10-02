import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = ({
        loadedPost: {},
        error: false
    });

    componentDidMount(){
      console.log('this.props.match ', this.props);
      this.loadData();
    }
    componentDidUpdate(){
     this.loadData();
    }

    loadData(){
        if(this.props.match.params.id){
            console.log('[FullPost] componentDidUpdate this.state.error:', this.state.error);
            if(!this.state.error){    
                if( !this.state.loadedPost.id || (this.state.loadedPost.id && this.state.loadedPost.id != this.props.match.params.id)){
                axios.get('posts/' + this.props.match.params.id)
                .then(response=>{
                    console.log('[FullPost] componentDidUpdate', response.data)
                    this.setState({
                        loadedPost: response.data
                    });
                })
                .catch(error=>{
                    console.log('[FullPost] componentDidUpdate Error', error);
                    this.setState({error:true});
                });
                }
            }
            }
    }

    deletePostHandler = (id)=>{
      axios.delete('posts/'+ this.props.match.params.id)
       .then(response=>{
           console.log('[FullPost] deletePostHandler then respnse: ', response)
       })
    }

    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        if(this.state.error)
            post = <p style={{textAlign:'center'}}>Somthing Went Wrong!!!</p>;
        if(this.props.match.params.id && !this.state.error) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={()=>this.deletePostHandler(this.state.loadedPost.id)}>Delete</button>
                    </div>
                </div>

            );
            }
        return post;
    }
}

export default FullPost;