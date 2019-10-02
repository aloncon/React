import * as actionTypes from '../actions'

const initialState = {
    countResults: []
}

const reducer = (state = initialState, action)=>{
    
    switch(action.type){
        case actionTypes.STORE_COUNTER:
            return {                       
                ...state,
                countResults: state.countResults.concat({result: action.counter, id: (new Date().getTime()) }) 
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