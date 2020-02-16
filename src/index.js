import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Web3 from 'web3';
import Web3Provider from 'react-web3-provider';

ReactDOM.render(<Web3Provider
              		defaultProvider={(cb) => cb(new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/YOUR_API_KEY")))}
              		loading="Loading..."
              		error={(err) => `Connection error: ${err.message}`}>
              		<App />
              	</Web3Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
