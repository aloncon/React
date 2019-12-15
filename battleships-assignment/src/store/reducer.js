import * as actionTypes from './action';



//const fleetTypes = ['Carrier', 'Battleship','Crusier','Destroyer'];
 /*
    fleet : {
        Carrier: 1,
        Battleship: 1,
        Crusier: 1,
        Destroyer: 1,
    },
    */

const fleetTypesMap = {'5':'Carrier', '4':'Battleship','3':'Crusier','2':'Destroyer'};
const fleet = [{size: 5, count:1},{size: 4, count:1},{size: 3, count:1},{size: 2, count:1}];
const initialState = {
    fleet: fleet,
    fleetTypesMap: fleetTypesMap,
    board: {
        placements: [],
        computerBoard: [],
        playerBoard: []     
    },
    loading: false,
}



const reducer = (state = initialState, action)=>{
    let tmpBoards ,tmpCompBoard, tmpPlayerBoard, shotFeildObj;

    switch(action.type) {
        case actionTypes.UPDATE_FLEET:
            const tempFleetStateArr = state.fleet.map(ship => ((ship.size ==  action.fleetType) ? ({size:  action.fleetType, count: +action.fleetSize}) : ship));
            return {
                ...state,
                fleet: tempFleetStateArr
            }

        case actionTypes.LOAD_GAME_INIT_START:
                    return {
                        ...state,
                        loading: true
                    }
        case actionTypes.LOAD_GAME_INIT_END:
                console.log("[REDUCER]: LOAD_GAME_INIT_END: ", state);
                return {
                    ...state,
                    loading: false
                }
        case actionTypes.START_GAME_INIT:
            console.log("[REDUCER]: START_GAME_INIT: ", state.fleet);
            return {
                ...state,
            }
        case actionTypes.LOAD_GAME_INIT_SUCCESS:
             console.log("[REDUCER]: LOAD_GAME_INIT_SUCCESS: ", action.computerBoard);
             return {
                ...state,
                board: {
                    
                    //placements: action.payload,
                    computerBoard: action.computerBoard,
                    playerBoard: action.playerBoard     
                }
            }
            
        case actionTypes.UPDATE_PLAYER_BOARD:
            console.log("[REDUCER]: UPDATE_COMPUTER_BOARD: ", action.computerBoard);    
            tmpBoards = {...state.board};
            tmpPlayerBoard = [...tmpBoards.playerBoard]; 
            shotFeildObj = tmpPlayerBoard[action.shotX][action.shotY]; 
            shotFeildObj.value = shotFeildObj.value ===1 ? 2 : 1;
            //shotFeildObj.sink = action.sink;
            tmpPlayerBoard[action.shotX][action.shotY] = shotFeildObj;
            tmpBoards['playerBoard'] = tmpPlayerBoard;

            //tmpBoards.computerBoard = action.computerBoard; 
            return {
                ...state,
                board: tmpBoards 
            }

        case actionTypes.UPDATE_COMPUTER_BOARD:
            tmpBoards = {...state.board};
            tmpCompBoard = [...tmpBoards.computerBoard]; 
            shotFeildObj = tmpCompBoard[action.shotX][action.shotY]; 
            shotFeildObj.value = action.shotHit? 2 : 1;
            shotFeildObj.sink = action.sink;
            tmpCompBoard[action.shotX][action.shotY] = shotFeildObj;
            tmpBoards['computerBoard'] = tmpCompBoard;

            //tmpBoards.computerBoard = action.computerBoard; 
            return {
                ...state,
                board: tmpBoards 
            }    
        
        }
    return state;
}

export default reducer;