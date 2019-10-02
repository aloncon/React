import React, { Component } from 'react';
import Posts from './Posts/Posts';
//import NewPost from './NewPost/NewPost';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import FullPost from './FullPost/FullPost';
import asyncComponent from '../../hoc/asyncComponent';
import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});





class Blog extends Component {

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                    <ul>
                        <li><NavLink 
                            to="/posts" 
                            exact
                            activeClassName="active"
                            activeStyle={{color:'#fa923f', textDecoration: 'underline'}}>Posts</NavLink></li>
                        <li><NavLink to={{
                                    pathname: '/new-post',
                                    hash: '#submit'
                                    }}>New Post</NavLink></li>
                    </ul>
                    </nav>
                </header>
                {/**
                <Route path="/"  render={()=><h1>Home</h1>} />
                <Route path="/" render={()=><h1>Home 2</h1>} />
                 */}
                <Switch>
                <Route path="/new-post"  component={AsyncNewPost} />
                <Route path="/posts" component={Posts} />
                  {/*<Route render={()=><h1>not found!</h1>} /> */}
                  
                  <Redirect from="/" to="/posts" />
                 
                </Switch>
                 
              
                {/*
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>

                */}

            </div>
        );
    }
}

export default Blog;