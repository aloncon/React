import React, { Component } from 'react';
import {connect} from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions'

class Counter extends Component {
 
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubCounter(5)}  />
                <button onClick={()=>this.props.onStoreAddButtonClicked(this.props.ctr)}>Store Result</button>
                <hr/>
                <ul>
                    {console.log('this.props.',this.props)}
                    
                    {this.props.counterResult.map((result)=>(
                        <li className={result.id + '_alon'} key={result.id} 
                            onClick={() => this.props.onStoreDeleteButtonClicked(result.id)}>Conunter ({result.id}): <b>{result.result}</b></li>
                    )       

                    ) }
                    
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        counterResult: state.res.countResults 
    }   
}
const mapDispatchedToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type:actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type:actionTypes.DECREMENT}),
        onAddCounter: (num) => dispatch({type:actionTypes.ADD, value: num}),
        onSubCounter: (num) => dispatch({type:actionTypes.SUB, value: num}),
        onStoreAddButtonClicked : (ctr) => dispatch({type: actionTypes.STORE_COUNTER, counter: ctr }),
        onStoreDeleteButtonClicked : (key) => dispatch({type: actionTypes.DELETE_COUNTER,key})
    }
}

export default connect(mapStateToProps, mapDispatchedToProps)(Counter);