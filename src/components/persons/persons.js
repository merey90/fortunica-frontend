import React, { Component } from 'react';
import axios from 'axios';

import './persons.css';

class Persons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: []
    }
  }

  async componentDidMount(){
    try {
      const clients = !!this.props.user ? '/user/'+this.props.user : '';
      const urlPath = `http://localhost:3000/${this.props.type}${clients}`;
      const res = await axios.get(urlPath);
      if(!!res.data && res.data.length > 0){
        this.setState({
          persons: res.data
        })
      } else{
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  render() {
    const listPersons = this.state.persons.map(person =>
      <li key={person._id} onClick={() => this.props.onClick(person)}>
        {person.name}
      </li>
    );
    return (
      <div className="persons">
        <ul>{listPersons}</ul>
      </div>
    );
  }
}

export default Persons;
