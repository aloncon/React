import React, {Component} from 'react';
import {connect} from 'react-redux';
import PlayBoardMatrix from './playBoardMatrix.js';
import Battleships from '../../api/battleships';
import * as actionTypes from '../../store/action';
import * as common from './common';
import styles from './PlayBoard.module.css';

class PlayBoard extends Component {
    constructor(props){
        super(props)
    };

    state = {
    }

    componentDidMount(){
        const boardSize = (this.props.location.appState && this.props.location.appState.boardSize) ? this.props.location.appState.boardSize:10; 
        console.log('[PLAYBOARD] xx clicked' , this.props.boards.playerBoard);
    }

    onBoxFeildClickHandler = (x, y)=>{
        console.log('onBoxFeildClickHandler CLICKED', x, y );
        this.props.dispatch( actionTypes.onPlayerShotHandler(x, y, this.props.boards.computerBoard) );  
        //this.props.onPlayerShotHandler(x, y);      
    }

    render(){
        const boardSize = (this.props.location.appState && this.props.location.appState.boardSize) ? this.props.location.appState.boardSize:10; 
      
        console.log('PLAY BOARD BOARDS: ', this.props.boards);
        console.log('PLAY Board MATRIX feild content: ', this.props.fleetTypes);
        return (
            <div className={styles.Content}>
                <div className={styles.BoardDiv}>
                    <div className={styles.GridDiv}>
                        <PlayBoardMatrix board={this.props.boards.playerBoard}
                                         fleetTypes={this.props.fleetTypesMap} 
                                         styles={styles} 
                                         onFeildClick={null}
                                         computerBoard={false}/>
                    </div>
                </div>
                <div className={styles.BoardDiv}>
                    <div className={styles.GridDiv}>
                     <PlayBoardMatrix board={this.props.boards.computerBoard} 
                                      styles={styles}
                                      fleetTypes={this.props.fleetTypesMap} 
                                      onFeildClick={this.onBoxFeildClickHandler}
                                      computerBoard={true}/>
                    </div>
                </div>
                
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        fleet:          state.fleet,
        boards:         state.board,
        fleetTypesMap:  state.fleetTypesMap,
    }
} 

const mapDispatchToProps = dispatch => {
    return {
       // onPlayerShotHandler : (shotX, shotY) => dispatch(actionTypes.onPlayerShotHandler(shotX, shotY))
    }
    
}
export default connect(mapStatetoProps)(PlayBoard);