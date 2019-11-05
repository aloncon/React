import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import styles from './App.module.css';
import About from './Components/About/About';
import Home from './Containers/Home/Home';
import ContactUs from './Containers/Contact/ContactUs';
import Hottest from './Containers/Hottest/Hottest';
import TradeShows from './Containers/TradeShows/TradeShows';


function App() {
  return (
    <div className={styles.Main}>
      <Layout>
      <Switch>
         
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
