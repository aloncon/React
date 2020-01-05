import tradeShowList from '../../ModuleInfo/trade_shows';

export const TOGGLE_SIDE_DRAWER = 'SIDE_DRAWER_TOGGLE';
export const TOGGLE_SIDE_DRAWER222 = 'SIDE_DRAWER_TOGGLE22';

//export const LOAD_TRADE_REQUEST = 'LOAD_TRADE_REQUEST';
export const LOAD_TRADE_SHOWS = 'LOAD_TRADE_SHOWS';
export const LOAD_TRADE_SUCCESS = 'LOAD_TRADE_SUCCESS';
export const LOAD_TRADE_START = 'LOAD_TRADE_START';
export const LOAD_TRADE_FAIL = 'LOAD_TRADE_FAIL';

/*
export function loadTradeShows() {

    return dispatch => {
        dispatch(loadTradeStart());
        setTimeout(()=>{
            dispatch(loadTradeSuccess(tradeShowList))
            return tradeShowList;
        }, 0)
        
    }
}
*/
export const loadTradeRequest = () => ({
    type: LOAD_TRADE_SHOWS
});
export const loadTradeStart = () => ({
        type: LOAD_TRADE_START
});

export const loadTradeSuccess = (tradeShowItems)=>({
    type: LOAD_TRADE_SUCCESS,
    payload: {tradeShowItems}
}) 

export const loadTradeFailure = (error)=>({
    type: LOAD_TRADE_FAIL,
    payload: {error}
})