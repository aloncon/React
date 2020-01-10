import React, {Component} from 'react';

class GalleryT extends Component {

    render(){
     console.log('galleryT 44444 ', this.props.imagesArr);
     const allPosts = this.props.imagesArr.map((post)=>{
         if(post) {
             console.log('XXXXXX galleryT ', post.original);
             return <li><img src={post.original} /></li>
         }
     })
     return (
         <div>all posts
          <ul>
              {allPosts}
          </ul>
         </div>);
    }
}

export default GalleryT;