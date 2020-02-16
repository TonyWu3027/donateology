import React,{Component} from "react";
import MetaMaskLoginButton from 'react-metamask-login-button';
import MetaMaskButton from './metamask/MetaMaskButton'

class Home extends Component {

  render(){
    return(
      <div className = "container">
        <MetaMaskLoginButton />
        <MetaMaskButton />
      </div>
    );
  }

}
export default Home;
