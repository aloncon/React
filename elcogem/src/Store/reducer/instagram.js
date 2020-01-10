import * as actionTypes from '../actions/actionsInstagram';

const initialState = {
    instDataObject : [],
    instDataObjectFirst30 : [],
    loading: true,
    loaddingError: false,
    loaddingMessage: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case (actionTypes.LOAD_MEDIA_START):
            return {
                ...state,
                loading: true
            }
        case (actionTypes.LOAD_MEDIA_FAIL):
            console.log('actionTypes.LOAD_MEDIA_FAIL', action)
            return {
                ...state,
                loading: false,
                loaddingError: true,
                loaddingMessage: JSON.stringify(action.payload.error)
            }
        case (actionTypes.LOAD_MEDIA_FIRST30_SUCESS):

            return {
                ...state,
                instDataObjectFirst30: action.payload.mediaDataArr,
                loading: false
            }

        case (actionTypes.LOAD_MEDIA_SUCESS):

            return {
                ...state,
                instDataObject: action.payload.mediaDataArr,
                loading: false
            }
        case (actionTypes.ADD_MEDIA_SUCESS):
            return {
                ...state,
                instDataObject: ([...state.instDataObject]).concat(action.payload.mediaDataArr),
                loading: false
            }
        default:
            return state;
    }
    return state;
}

export default reducer;