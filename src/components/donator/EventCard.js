import React, {Component} from 'react';

class EventCard extends Component {


  render() {
    return(
      <div className="card">
        <div className="card-body">
          <h2> Card img</h2>
          <h4 className="card-title">Card Title</h4>
          <p className="card-text">Some example text.</p>
          <a href="#" className="btn btn-primary">See Profile</a>
        </div>
      </div>
    );
  }
}


export default EventCard;
