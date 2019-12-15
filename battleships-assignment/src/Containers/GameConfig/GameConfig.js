import React, {Component} from 'react';
import { Link, withRouter } from "react-router-dom";
import * as ConfifInit from './ConfigInit';
import {connect} from 'react-redux';
import Select from './UI/Select';
import styles from './GameConfig.module.css';
import * as actionTypes from '../../store/action';
import Battleships from '../../api/battleships';

//const fleetTypes = ['Carrier', 'Battleship','Crusier','Destroyer'];
const boaredSizeMin = 10;
const boxSize = 25;

class GameConfig extends Component {
 
    state = {
        boardSize: 10,
    }

    onBoardSizeChangeHandler = (event, type) => {
        console.log('Game Config Select onBoardSizeChangeHandler', event.target.value, type );
        this.setState({
            boardSize : event.target.value
        });
    }
    
   

    OnStartButtonClickedHandler = () => {
        //console.log(' xx clicked' , this.props.history);
       // console.log(' xx clicked dispatch' , this.props.dispatch());
        

        this.props.onStartGameInit(this.state.boardSize);

        this.props.history.push({
            pathname: "/playboard",
            appState: {
                boardSize:this.state.boardSize
            }
        })
        
    }

    render(){
        const fleetInputs = this.props.fleet.map(fShip => {
            console.log('tets  fleetInputs2 ' , fShip.size, fShip.count );
            console.log('tets  fleetInputs2 type', this.props.fleetTypesMap[''+fShip.size]  );
            let type = this.props.fleetTypesMap[''+fShip.size];
            return (
                <li key={type}>
                <div className={styles.Display_Flex}>
                 <div className={styles.InputDiv}><Select type='boardSize' minSize="1" maxSize="4" selected={fShip.count}
                                                          change={(event) => this.props.onSelectChangeHandler(fShip.size, event.target.value)}/></div>
                 <div className={styles.InputCopy}><img alt={type} src={'/Assets/'+type+'.svg'} /></div>
                </div>
              </li>
                );
        })


        const fleetTypes = Object.keys(this.props.fleet).map(type => type);
        const fleetInputs2 = fleetTypes.map((type)=>{
            return (
            <li key={type}>
             <div className={styles.Display_Flex}>
              <div className={styles.InputDiv}><Select type='boardSize' minSize="1" maxSize="4" selected={this.props.fleet[type]}
                                                       change={(event) => this.props.onSelectChangeHandler(type, event.target.value)}/></div>
              <div className={styles.InputCopy}><img src={'/Assets/'+type+'.svg'} /></div>
             </div>
           </li>
            );            
        })
    
        return (
            <div className={styles.Main}>

                <div className={styles.Content}>
                    <ul>
                        <li><div className={styles.Display_Flex}>
                              <div className={styles.InputDiv}><Select change={(event) => this.onBoardSizeChangeHandler(event,'boardSize')} type='boardSize' minSize="8" maxSize="16" selected={this.state.boardSize}/></div>
                              <div className={styles.InputCopy}>BOARD SIZE</div>
                            </div>
                        </li>
                        {fleetInputs}
                  
                        <div className={styles.Button}>
                            <button onClick={this.OnStartButtonClickedHandler}>START</button>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        fleet           : state.fleet,
        fleetTypesMap   : state.fleetTypesMap,
        
    }
} 
const mapDispatchToProps = dispatch => {
    return {
        onSelectChangeHandler : (type, size) => dispatch({type: actionTypes.UPDATE_FLEET , fleetSize: size, fleetType: type }),
        onStartGameInit : (boardSize) => dispatch(actionTypes.loadGameInit(boardSize)),
    }
    
}

export default connect(mapStatetoProps, mapDispatchToProps)(GameConfig);
