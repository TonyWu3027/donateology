import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';



class EventCard extends Component {
  constructor(){
      super();
      this.state = {
        show : false,
      }

      this.handleClose = this.handleClose.bind(this);
      this.handleShow = this.handleShow.bind(this);
    }

  handleClose() {
    this.setState({show:false,});
  }

  handleShow() {
    this.setState({show:true,});
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
            <p>Total Amount Raised:</p>
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
