import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import MetaMaskButton from '../metamask/MetaMaskButton';
import MetaMaskContext from "../metamask/metamask";
import SendEther from '../metamask/SendEther'
import Web3 from 'web3';




//init
let {web3} = window;
const target_copy = Object.assign({}, web3);
web3 = new Web3(target_copy.currentProvider);
let url;
(async () => {
  let senders = await web3.eth.getAccounts();
let sender = senders[0];
let contract = new web3.eth.Contract(abi, address)
})()

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


  handleClose() {
    this.setState({show:false,});
  }

  handleShow() {
    this.setState({show:true,});
  }

  async makeRequest(e){
    e.preventDefault()


    // const url = 'http://localhost:5000?amt='+this.state.amt;
    // console.log(url)
    //
    // axios.get(url)
    // .then((res) =>{
    //   this.setState({response : res.data});
    //   console.log(this.state.response)
    // })
    // .catch(err => {
    //   console.error(err)
    // });


    sendEther(sender,"0xEB8a5755f2A9BCBe686B3d841405221EF21db855",0.05);


  }


   async sendEther (sender,receiver, amount){
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
  }

  async updateHash (sender,methods,hash) {
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

  async getHash (sender,methods) {
      let hash = await methods.getHash().call({
          from: sender
      });
      return Promise.resolve(hash);
  };




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
        <SendEther></SendEther>
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

let address = "0xf0E0E842Efb2cC5B196461927Ef25471f03D2511";
let abi = [{
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "name": "donator",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "hash",
                "type": "string"
            }
        ],
        "name": "UpdateHash",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [{
            "name": "_hash",
            "type": "string"
        }],
        "name": "updateHash",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getHash",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
