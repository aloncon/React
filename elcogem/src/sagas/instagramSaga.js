import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import * as instaActions from '../Store/actions/actionsInstagram';

const instUri = "https://api.instagram.com/v1/users/6974393317/media/recent?access_token=6974393317.1677ed0.cae455253ae34dfcbbca5e59f4cc9a4c&count=50";

 function* loadMediaFromInstagram() {
    //
        try{
            yield put(instaActions.loadMediaFromInstagramStart());
            const mediaArr = yield call(instaActions.fetchDataFromInstagram);
            const mediaArrClean = (mediaArr.data).filter(
                (obj)=> (!obj.caption ||
                         (obj.caption && obj.caption.hasOwnProperty('text') &&
                          obj.caption.text.toLowerCase().indexOf('(_general)') == -1) )
            );
            yield put(instaActions.loadMediaFromInstagramSuccess(mediaArrClean));
        }catch(error){
            console.log('SAGA Action start Media load FAILD');
            yield put(instaActions.loadMediaFromInstagramFailure(error));
        }

}

 function* loadMediaFromInstagramForType(action) {
    try{
        yield put(instaActions.loadMediaFromInstagramStart());
        const mediaArr = yield call(instaActions.fetchDataFromInstagram);
        //loop for all TYPE items
        const type = '(_'+action.payload+')';

        let mediaArrForType = (mediaArr.data).filter(
            (obj)=> (obj.caption && obj.caption.hasOwnProperty('text') &&
                     obj.caption.text.toLowerCase().indexOf(type)>0    &&
                     obj.caption.text.toLowerCase().indexOf('(_general)') == -1)
        );
        yield put(instaActions.loadMediaFromInstagramSuccess(mediaArrForType));

        //loop for all pagination / next_max_id / next_url:
        let next_url = mediaArr.pagination.next_url;
        while(next_url) {
            const nextMediaArr = yield call(instaActions.fetchDataFromInstagram, next_url);
            //loop for all pagination / next_max_id / next_url
            mediaArrForType = (nextMediaArr.data).filter((obj) => (obj.caption && obj.caption.hasOwnProperty('text') && obj.caption.text.toLowerCase().indexOf(type) > 0));
            yield put(instaActions.concatMediaFromInstagramSuccess(mediaArrForType));
            next_url = (nextMediaArr.pagination && nextMediaArr.pagination.next_url) ? nextMediaArr.pagination.next_url : null;
        }

    }catch(error){
        console.log('SAGA Action start Media load FAILD',error);
        yield put(instaActions.loadMediaFromInstagramFailure(error));
    }

}

const rootSaga = [
    takeEvery(instaActions.LOAD_MEDIA_REQUESTED_FOR_TYPE, loadMediaFromInstagramForType),
    takeEvery(instaActions.LOAD_MEDIA_REQUESTED, loadMediaFromInstagram)
]
/*
function* rootSaga(){
    console.log('root Saga');
    return [
    yield takeEvery(instaActions.LOAD_MEDIA_REQUESTED_FOR_TYPE, loadMediaFromInstagramForType),
    yield takeEvery(instaActions.LOAD_MEDIA_REQUESTED, loadMediaFromInstagram)
    ]

}
*/
export default rootSaga;