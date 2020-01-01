import * as actionTypes from '../actions/actionsTradeShows';

const initialState = {
    tradeShowList : [],
    onLoad: false,
    errorMessage: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_TRADE_START : 
            return {
                ...state,
                onLoad: true,
            }
        case actionTypes.LOAD_TRADE_FAIL:
            return {
                ...state,
                onLoad: false,
                errorMessage : action.payload.error
            }    
        case actionTypes.LOAD_TRADE_SUCCESS:
            return {
                ...state,
                onLoad: false,
                tradeShowList : action.payload.tradeShowItems
            }
        default:
            return state;    
    }
    return state;
}

export default reducer;