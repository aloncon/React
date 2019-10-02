import React, { Component } from 'react';

class Course extends Component {
    state = {
        title: '',
    }

    componentDidMount(){
        this.parseQuery();
    }
    componentDidUpdate(){
        this.parseQuery();
    }
    parseQuery(){
        console.log('[Course] match;',this.props.match);
        console.log('[Course] props;',this.props.location);
        const qParams = new URLSearchParams(this.props.location.search);
        const title = qParams.get('title');
        if(title !== this.state.title)
           this.setState({title: title});
     
    }
    
    render () {
        
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>You selected the Course with ID: <b>{this.props.match.params.id}</b> </p>
            </div>
        );
    }
}

export default Course;