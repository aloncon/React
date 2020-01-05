import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import * as tradeShowsActions from '../Store/actions/actionsTradeShows';
import tradeShowList from '../ModuleInfo/trade_shows';


const instUri = "https://api.instagram.com/v1/users/6974393317/media/recent?access_token=6974393317.1677ed0.cae455253ae34dfcbbca5e59f4cc9a4c&count=50";

 function* loadTradeShows() {

        try{
            yield put(tradeShowsActions.loadTradeStart());
            yield put(tradeShowsActions.loadTradeSuccess(tradeShowList));

        }catch(error){
            console.log('SAGA Action start trade load FAILD');
            yield put(tradeShowsActions.loadTradeFailure(error));
        }

}

const rootSaga = [
                takeEvery(tradeShowsActions.LOAD_TRADE_SHOWS, loadTradeShows)
                ]

/*
function* rootSaga(){
     return [
      yield takeEvery(tradeShowsActions.LOAD_TRADE_SHOWS, loadTradeShows)
    ]
 }
*/
export default rootSaga;