import Battleships from '../api/battleships';

export const UPDATE_BOARDSIZE = 'UPDATE_BOARDSIZE';
export const UPDATE_FLEET = 'UPDATE_FLEET';
export const START_GAME_INIT = 'START_GAME_INIT';
export const LOAD_GAME_INIT_START = 'LOAD_GAME_INIT_START';
export const LOAD_GAME_INIT_SUCCESS = 'LOAD_GAME_INIT_SUCCESS';
export const LOAD_GAME_INIT_END = 'LOAD_GAME_INIT_END'; 
export const UPDATE_PLAYER_BOARD = 'UPDATE_PLAYER_BOARD';
export const UPDATE_COMPUTER_BOARD = 'UPDATE_COMPUTER_BOARD';

const api = new Battleships();

export const addPlacmentToBoard = (board, placment) => {
    return new Promise ((resolve, reject) => {
        let placementSet = false;
        placment.map(shipPlace => {
            for(let i=0; i<shipPlace.size; i++){    
             if(!shipPlace.vertical){   
                 board[shipPlace.x+i][shipPlace.y] = {value: 1};
             }else{
                 board[shipPlace.x][shipPlace.y+i] = {value: 1};
             }     
            }
            board[shipPlace.x][shipPlace.y] = {
                ...shipPlace,
                value: 1
            };
        });
        
        console.log('[ACTION] addPlacmentToBoard() end promie:' , board);
        resolve(board);
    });
}
export const buildEEmptyBoard = (width, height) => {
    return new Promise ((resolve, reject) => {
        
        const board = [];
        for(let i=0; i< width; i++){
            let row = [];
            for(let j=0; j<height; j++){
                    row.push({value: 0});
            }    
            board.push(row);
        }
        resolve(board);
    
    });
}

export function loadGameInit(boardSize) {
    
    return dispatch => {
        dispatch(loadGameInitStart()); 

        api.start({width:boardSize, height:boardSize})
        .then(async (res)=>{
            console.log('[ACTION] then 1 -- PLACMENT -- :' , res);
            
            let computerBoard = await buildEEmptyBoard(res.width, res.height);
            let playerBoard = await buildEEmptyBoard(res.width, res.height);
                playerBoard = await addPlacmentToBoard(playerBoard, res.placements);
                //console.log('ACTION playerBoard: ', playerBoard);     
            return {computerBoard, playerBoard};        
        })
        .then( (res)=>{
            dispatch(loadGameInitSuccess(res.computerBoard, res.playerBoard));
            dispatch(loadGameInitEnd());
        })

        return;
    }

}

export function onPlayerShotHandler(shotX, shotY, board) {
    //const api = new Battleships();
    console.log('onPlayerShotHandler xxxxx ',shotX, shotY, board);

    return dispatch => {
        console.log('onPlayerShotHandler',shotX, shotY);

        api.shoot({x: shotX, y: shotY})
        .then((res)=>{
            console.log('SHOOT Hit',res.hit);
            console.log('SHOOT Sink',res.sink);
            dispatch(updateCompBoardOnShot(shotX, shotY, res.hit, res.sink))
            //dispatch(loadGameInitEnd());
            return;
        }).then(()=>{
            api.getShot()
            .then(res=>{
                console.log('GETTTT SHOOT ',res);
                dispatch(updatePlayerBoardOnShot(res.x, res.y));
                dispatch(loadGameInitEnd());
            })
             .then(()=>api.respondShot({hit:false, sink:null}))
        })
        .catch((error)=>{
            console.log('ERROR on SHOOT', error)
        })
        

       // return;
    }
}

export function loadGameInit22(boardSize) {
    //const api = new Battleships();
    return dispatch => {
        dispatch(loadGameInitStart()); 

        api.start({width:boardSize, height:boardSize})
        .then(async (res)=>{
            console.log('[ACTION] Start():' , res);
            
            let computerBoard = await buildEEmptyBoard(res.width, res.height);
            let playerBoard = await buildEEmptyBoard(res.width, res.height);
                playerBoard = await addPlacmentToBoard(playerBoard, res.placements);
                
            console.log('[ACTION] loadGameInit() after addPlacmentToBoard:' , playerBoard, computerBoard);

            dispatch(loadGameInitSuccess(res.placements, computerBoard, playerBoard));
            dispatch(loadGameInitEnd());
        
        })

        return;
    }
    
  

}
//for On Loading: true
export const updateCompBoardOnShot = (shotX, shotY, hit, sink) => ({
    type: UPDATE_COMPUTER_BOARD,
    shotX: shotX,
    shotY: shotY,
    shotHit: hit,
    sink: sink

})
export const updatePlayerBoardOnShot = (shotX, shotY) => ({
    type: UPDATE_PLAYER_BOARD,
    shotX: shotX,
    shotY: shotY
})
export const loadGameInitStart = () => ({
    type: LOAD_GAME_INIT_START
});
export const loadGameInitEnd = () => ({
    type: LOAD_GAME_INIT_END
});
export const loadGameInitSuccess = (cBoard, pBoard)=>({
 type: LOAD_GAME_INIT_SUCCESS,
 //payload: placements,
 computerBoard: cBoard,
 playerBoard: pBoard 
}) 
