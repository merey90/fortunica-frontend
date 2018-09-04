import React, { Component } from 'react';
import axios from 'axios';

import ClientLogin from './../../components/client-login/client-login';
import Persons from './../../components/persons/persons';
import Conversation from './../conversation/conversation';

import './client.css';
class Client extends Component {
  constructor(props){
    super(props);
    this.state = {
      client:{},
      user:{},
      conversation: {},
    }

    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
  }

  async handleSubmitLogin(event) {
    event.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3000/clients/${this.state.client.name}`);
      if(!!res.data.client)
        this.setState({ client: res.data.client });
      else
        console.log('not found');
    } catch (error) {
      console.log(error);
    }
  }

  async handleSubmitRegister(event) {
    event.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/clients/`, this.state.client);
      if(!!res.data.client)
        this.setState({ client: res.data.client });
      else
        console.log('not found');
    } catch (error) {
      console.log(error);
    }
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      client: {
        ...this.state.client,
        [name]: value
      }
    });
  }

  handleUserClick(user){
    this.setState({
      user
    });
  }

  render() {
    let page;
    if(!this.state.conversation._id){

    }
    if(!this.state.client._id)
      page = <ClientLogin
        handleSubmitRegister={this.handleSubmitRegister}
        handleInputChange={this.handleInputChange}
        handleSubmitLogin={this.handleSubmitLogin}/>;
    else if(!!this.state.client._id && !this.state.user._id)
      page = <Persons type="users" onClick={this.handleUserClick}/>
    else if(!!this.state.client._id && !!this.state.user._id)
      page = <Conversation
                user={this.state.user}
                client={this.state.client}
                forClient={true}/>

    return(
      <div>
        {page}
      </div>
    )
  }
}


export default Client;
