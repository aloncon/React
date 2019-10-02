import React, {Component} from 'react';

import './AddPerson.css';

class AddPerson extends Component {
    state = {
        name: '' ,
        age : ''
    }

    onChangeNameHandler = (event)=>{
        this.setState({
            name: event.target.value
        });
    }

    onChangeAgeHandler = (event)=>{
        this.setState({
            age: +event.target.value
        });

    }

    onSubmitButtonHandler = ()=>{

        this.refs.name.value='sd';
        //this.refs.age.value = null;
       
    }

    render(){
        return(
            <div className="AddPerson">
                <input type="text" placeholder="name" ref="name"
                       value={this.state.name}
                       onChange={this.onChangeNameHandler} />
                <input type="number" placeholder="Age" ref="age"
                       value={this.state.age} 
                       onChange={this.onChangeAgeHandler}/>
                <button onClick={() => { this.onSubmitButtonHandler(); this.props.personAdded(this.state.name, this.state.age);}}>Add Person</button>
            </div>
        );
    }
}

export default AddPerson;