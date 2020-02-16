import React, {Component} from 'react';
import EventDesc from './EventDesc';
import tempEvents from './events.json';

class Donator extends Component{

  constructor(){
    super();
    this.state = {
      events : [],
    }
  }

  componentDidMount(){
    this.setState({events : tempEvents,});
  }

  render(){
    return(
      <div className = "container">
        <div className = "alert alert-success">
          Donator's Home Page
        </div>
        <EventDesc />

        <div className = "row">
        {this.state.events.map((item,index) => {
          return(
          <div className="card col-md-4" key = {index}>
            <div className="card-body">
              <h2> Card img</h2>
              <h4 className="card-title">{item.title}</h4>
              <p className="card-text">
                {item.bio}
              </p>
              <button type="button" className="btn btn-primary">
                Read
              </button>
            </div>
          </div>);
        })}
        </div>

      </div>
    )
  }
}

export default Donator;
