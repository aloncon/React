import React, {Component} from 'react';
import Post from '../../../components/Post/Post';
import axios from 'axios';
import './Posts.css';
import {Route, Link} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
 

class Posts extends Component {
    state = ({
        posts: []
    });
    componentDidMount () {
        console.log('[BLOG] componentDidMount Start fetch Jason');
        axios.get('posts')
        .then(response => {
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map(post=>{
                return {...post,
                        author: 'Max'}
            });
            this.setState({posts: updatedPosts});
            console.log('[BLOG] componentDidMount done fetch ', Array.isArray(response.data));
        }).then(()=>{
            console.log('[BLOG] componentDidMount Finle done')
        })
    }

    postSelectedHandler (id){
       // this.setState({selectedPostId: id})
       console.log('[BLOG.JS] postClickHandler clicked', this.props.history)
       this.props.history.push('/'+id);
       
    }



    render(){
        const posts = this.state.posts.map((post)=>{
            return <Link to={'/posts/'+post.id} key={post.id}>
                    <Post 
                         
                        title={post.title} 
                        author={post.author}
                        clicked={()=>{this.postSelectedHandler(post.id)}}/>
                   </Link>
        });
    
        return (
            <div>
                <section className="Posts">
                 {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} component={FullPost} />
                {console.log('matchccccccccccccc', this.props.match.url)}
            </div>
           

        );
    }
}

export default Posts;