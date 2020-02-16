import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import MetaMaskButton from '../metamask/MetaMaskButton';
import MetaMaskContext from "../metamask/metamask";




class EventDesc extends Component {
  constructor(){
      super();
      this.state = {
        show : false,
        info : '0',
        amt:'',
        response : {}
      }

      this.handleClose = this.handleClose.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.makeRequest = this.makeRequest.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    /*
  async componentDidMount(){

    //address and abi already loaded

    const initContract = async () => {
        contract = new web3.eth.Contract(abi, address);
        window.methods = contract.methods;
        window.contract = contract;
        window.sender = web3.eth.currentProvider.selectedAddress;
    };

    const sendEther = async (receiver, amount) => {
        let receipt = await web3.eth.sendTransaction({
            from: sender,
            to: receiver,
            gasPrice: "120000000000",
            value: web3.utils.toWei(amount, 'ether')
        }).on('receipt', r => {
            console.log(r);
        }).on('error', console.error);
        let url = "https://ropsten.etherscan.io/tx/" + receipt.transactionHash;
        return Promise.resolve(url);
    };

    const updateHash = async (hash) => {
        let receipt = await methods.updateHash(hash).send({
            from: sender,
            gasPrice: "120000000000",
            value: 0
        }).on('receipt', r => {
            console.log(r);
        }).on('error', console.error);
        console.log("recipt!!", receipt.transactionHash);
        let url = "https://ropsten.etherscan.io/tx/" + receipt.transactionHash;
        return Promise.resolve(url);
    };

    const getHash = async () => {
        let hash = await methods.getHash().call({
            from: sender
        });
        return Promise.resolve(hash);
    };

    //modern dapp browser
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        await ethereum.enable();
    } else {
        // Non-dapp browsers…
        console.log("Ethereum browser not detected.You should consider trying MetaMask!");
    }

    try {
        await initContract();
        // let url1 = await sendEther("0xEB8a5755f2A9BCBe686B3d841405221EF21db855", "0.05");
        // console.log("SENT", url1);
        let url2 = await updateHash("HHHHH");
        console.log("URL2", url2);
        let hash = await getHash();
        console.log("HASH", hash);

    } catch (err) {
        console.log(err);
    }
  }*/

  handleClose() {
    this.setState({show:false,});
  }

  handleShow() {
    this.setState({show:true,});
  }

  makeRequest(e){
    e.preventDefault()


    const url = 'http://localhost:5000?amt='+this.state.amt;
    console.log(url)

    axios.get(url)
    .then((res) =>{
      this.setState({response : res.data});
      console.log(this.state.response)
    })
    .catch(err => {
      console.error(err)
    });

    for(var i = 1; i <=5 ; i++){

    }
  }


  handleChange (e) {
      const target = e.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });

  }

  render(){
    return(
      <div>
        <div className="card">
          <div className="card-body">
            <h2> Card img</h2>
            <h4 className="card-title">COVID-19 in Wuhan, China</h4>
            <p className="card-text">Wuhan has experienced a severe coronavirus outbreak since Dec 2019, and the local medical services are under extreme shortage of masks and protective suits and goggles. Every day doctors and nurses are risking their lives to save the people in need. We need you to give us a hand by donating to the hospital for medical consumables.</p>
            <button type="button" className="btn btn-primary" onClick={this.handleShow}>
              Read
            </button>
          </div>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>COVID-19</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Wuhan is in need!</h2>
            <p>some description of the situation in Wuhan goes here</p>
            <p>Total Amount Raised:{this.state.info}</p>


            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>How much do you want to </Form.Label>
                <Form.Control type="text" name = "amt" value ={this.state.amt} onChange = {this.handleChange}/>
              </Form.Group>

              <Button variant="primary" type="submit" onClick = {this.makeRequest}>
                Submit
              </Button>
            </Form>

            <MetaMaskContext.Provider immediate value={true}>
              <MetaMaskButton />
            </MetaMaskContext.Provider>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div>

    );
  }

}

export default EventDesc;
