import React,{Component} from "react";
import MetaMaskContext from "./metamask/metamask";
import MetaMaskButton from './metamask/MetaMaskButton'
import SendEther from './metamask/SendEther'
class Home extends Component {

  render(){
    return(
      <div className = "container">
              <MetaMaskContext.Provider immediate = {true}>
        <MetaMaskButton />
        <SendEther/>
        </MetaMaskContext.Provider >
      </div>
    );
  }

}
export default Home;
