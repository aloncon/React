/*
import * as actionTypes from './actions'

const initialState = {
    counter: 0,
    countResults: []
}

const reducer = (state = initialState, action)=>{
    
    switch(action.type){
        case actionTypes.INCREMENT:
            //alternative for spread oprator - Object.assign!!
            //const newState = Object.assign({}, this.state)
            //newState.counter = state.counter+1; 
            return {
                ...state,
                counter: state.counter+1
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter-1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
        case actionTypes.SUB:
            return {
                ...state,
                counter: state.counter - action.value
            }
        case actionTypes.STORE_COUNTER:   
                  
            return {                       
                ...state,
                countResults: state.countResults.concat({result: state.counter, id: (new Date().getTime()) }) 
            }
        case actionTypes.DELETE_COUNTER:    
                console.log('this.state.countResults filter', state.countResults.filter(item => item.id !== action.key) );
            return {
                ...state,
                countResults: state.countResults.filter(item => item.id !== action.key)
            }
    }    
   
    return state;
}

export default reducer;
*/