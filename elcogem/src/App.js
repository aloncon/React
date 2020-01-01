import React from 'react';
import {Switch, Route} from 'react-router-dom';
//import {browserHistory} from 'react-router';
import Layout from './hoc/Layout/Layout';
import styles from './App.module.css';
import About from './Components/About/About';
import Home from './Containers/Home/Home';
import ContactUs from './Containers/Contact/ContactUs';
import Hottest from './Containers/Hottest/Hottest';
import TradeShows from './Containers/TradeShows/TradeShows';


function App() {
  return (
    <div className={[styles.Main,'Main'].join(' ')}>
      <Layout>
       <Switch>
        
         <Route path="/new/about" component={About}/>
         <Route path="/new/main" component={Home}/>
         <Route path="/new/home" component={Home}/>
         <Route path="/new/contact-us" component={ContactUs}/>
         <Route path="/new/contact" component={ContactUs}/>
         <Route path="/new/hottest-collection" component={Hottest}/>
         <Route path="/new/trade-shows" component={TradeShows}/>


         <Route path="/about" component={About}/>
         <Route path="/main" component={Home}/>
         <Route path="/home" component={Home}/>
         <Route path="/contact-us" component={ContactUs}/>
         <Route path="/contact" component={ContactUs}/>
         <Route path="/hottest-collection" component={Hottest}/>
         <Route path="/trade-shows" component={TradeShows}/>

         <Route path="/"  component={Home}/>

        </Switch>

      </Layout>
     
     

    </div>
  );
}

export default App;
