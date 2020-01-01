import axios from 'axios';

export const LOAD_MEDIA_START = 'LOAD_MEDIA_START';
export const LOAD_MEDIA_FAIL = 'LOAD_MEDIA_FAIL';
export const LOAD_MEDIA_SUCESS = 'LOAD_MEDIA_SUCESS';
export const ADD_MEDIA_SUCESS = 'ADD_MEDIA_SUCESS';

const instUri = "https://api.instagram.com/v1/users/6974393317/media/recent?access_token=6974393317.1677ed0.cae455253ae34dfcbbca5e59f4cc9a4c&count=50";

const fetchDataFromInstagram = (url) => {
    return new Promise((resolve, reject)=>{
        //fetch
        //const instUri = "https://api.instagram.com/v1/users/624059676/media/recent?access_token=624059676.1677ed0.cec7da6c5f1d4b8b8b2dc68258e31309&count=12";


        axios.get(url)
            .then((jsonData)=> {

                //console.log('data from inst JSON', jsonData);
                resolve(jsonData.data);
             })    
            .catch(err => {
                reject(err);
                //this.setState({loaddingError: true, loading: false, loaddingMessage: err.toString()})
            });

    })
}

export function loadMediaFromInstagram() {
    console.log('Actions start loading Media');
    return async dispatch => {
        try {
            dispatch(loadMediaFromInstagramStart());
            const mediaArr = await fetchDataFromInstagram(instUri);
            //console.log('Actions after await loading Media', mediaArr);
            dispatch(loadMediaFromInstagramSuccess(mediaArr.data));
            return mediaArr;
        }catch (error) {
            console.log('Actions after await errroor ', error);
            dispatch(loadMediaFromInstagramFailure(error));
        }
    }
}
export function loadMediaFromInstagramForType(type) {

    return async dispatch => {
        try {
            dispatch(loadMediaFromInstagramStart());
            const mediaArr = await fetchDataFromInstagram(instUri);

            //loop for all pagination / next_max_id / next_url
            let mediaArrForType = (mediaArr.data).filter((obj)=> (obj.caption && obj.caption.hasOwnProperty('text') && obj.caption.text.toLowerCase().indexOf(type)>0));
            dispatch(loadMediaFromInstagramSuccess(mediaArrForType));

            //loop for all pagination / next_max_id / next_url:
            console.log('Actions after await loading Media type', mediaArr.pagination);
            console.log('Actions after await loading Media type', mediaArr.pagination.next_url);
            let next_url = mediaArr.pagination.next_url;
            while(next_url) {
                const nextMediaArr = await fetchDataFromInstagram(next_url);
                //loop for all pagination / next_max_id / next_url
                mediaArrForType = (nextMediaArr.data).filter((obj) => (obj.caption && obj.caption.hasOwnProperty('text') && obj.caption.text.toLowerCase().indexOf(type) > 0));
                dispatch(concatMediaFromInstagramSuccess(mediaArrForType));
                next_url = (nextMediaArr.pagination && nextMediaArr.pagination.next_url) ? nextMediaArr.pagination.next_url : null;
            }
            return mediaArrForType;
        }catch (error) {
            dispatch(loadMediaFromInstagramFailure(error));
        }
    }
}
export const loadMediaFromInstagramStart = () => ({
        type: LOAD_MEDIA_START
});

export const loadMediaFromInstagramSuccess = (mediaDataArr)=>({
    type: LOAD_MEDIA_SUCESS,
    payload: {mediaDataArr}
})
export const concatMediaFromInstagramSuccess = (mediaDataArr) => ({
    type: ADD_MEDIA_SUCESS,
    payload: {mediaDataArr}
})

export const loadMediaFromInstagramFailure = (error)=>({
    type: LOAD_MEDIA_FAIL,
    payload: {error}
})
