import {all} from 'redux-saga/effects';
import instagramSaga from './instagramSaga';
import tradeShowsSaga from './tradeShowsSaga';

function* rootSaga(){

    yield all([
        ...instagramSaga,
        ...tradeShowsSaga
    ]) ;
}

export default rootSaga;