import React, {Component} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import axios from 'axios';



class EventCard extends Component {
  constructor(){
      super();
      this.state = {
        show : false,
        info : '0',
        amt:'',
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

  makeRequest(e){
    e.preventDefault()
    /*
    fetch('http://127.0.0.1:5000/' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({amt:this.state.amt})
    })
    .then((result) => result.json())
    .then((info) => { this.setState({info:info}) })
    console.log(this.state.info); */

    const myPost = {
      amt : this.state.amt,
    }

    axios.post('http://localhost:5000/', myPost)
    .then((res) => console.log(res))
    .catch(err => {
      console.error(err)
    });
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

export default EventCard;
