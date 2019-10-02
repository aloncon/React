const initialState = {
    persons: [{id: 332,
               name:'alon',
               age: 45}]
};


const reducer = (state = initialState, action) => {
    console.log("state 2 ", state.persons)
    switch(action.type){
        case 'ADD_PERSON':
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor( Math.random() * 40 )
            }        
            return {
                ...state,
                persons: state.persons.concat( newPerson )
            };
        case 'DELETE_PEROSN':
            return {...state};

    return state;
    }

}

export default reducer;