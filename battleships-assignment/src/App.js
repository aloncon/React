import React from 'react';
import GameConfig from './Containers/GameConfig/GameConfig';
import PlayBoard from './Containers/PlayBoard/PlayBoard';
import {BrowserRouter as Rauter, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Rauter>
        <div className="Content">
          <div className="Header">BATTELSHIPS</div>
         {/*<GameConfig /> */}
        
        <Switch>
          
          <Route path="/playboard" component={PlayBoard} /> 
          <Route path="/" component={GameConfig} />

          <Route render={()=>(<h1>PAGE NOT FOUND!</h1>)} /> 
        </Switch>
        </div>      
      </Rauter>
    </div>
  );
}

export default App;
