import React, { useContext } from 'react';
import '../css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Web3 from 'web3';

/*
let {web3} = window;
const target_copy = Object.assign({}, web3);
web3 = new Web3(target_copy.currentProvider);
let url;
(async () => {
  let senders = await web3.eth.getAccounts();
let sender = senders[0];
let contract = new web3.eth.Contract(abi, address)
})()
*/

import Home from './home/Home'
import Donator from './donator/Donator';
import Dashboard from './dashboard/Dashboard';
import Nav from './Nav';

function App() {
  return (
    <div className = "App">
        <Router>
            <Nav />
            <Switch>
              <Route exact path="/" component = {Home} />
              <Route path="/donator" component = {Donator} />
              <Route path="/dashboard" component = {Dashboard} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
