import * as actionTypes from '../actions/actionsTradeShows';

const initialState = {
    showSideDrawer:false
}


const reducer = (state = initialState, action) => {
    switch(action.type){
     case(actionTypes.TOGGLE_SIDE_DRAWER):
     console.log('actionTypes.TOGGLE_SIDE_DRAWER');
     return {
         ...state,
         showSideDrawer: !state.showSideDrawer
        }
    
    
    } 

    return state;
}

export default reducer;