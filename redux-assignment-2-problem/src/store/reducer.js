import * as actionTypes from './actions';

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    console.log("state 2 ", state.persons)
    switch(action.type){
        case actionTypes.ADD_PERSON:
            console.log('switch Add Person' , state);
            console.log('switch Add Person' , action);
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: action.name,
                age: action.age
            }
            return {
                ...state,
                persons: state.persons.concat( newPerson )
            }
        case actionTypes.REMOVE_PERSON:
                console.log('switch delete Person 1' , state, action);   
                return {
                    ...state,
                    persons: state.persons.filter(person => person.id !== action.id)
                       
                }        
    }

    return state;
}

export default reducer;