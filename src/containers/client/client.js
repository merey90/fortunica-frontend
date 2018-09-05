import React, { Component } from 'react';
import axios from 'axios';

import ClientLogin from './../../components/client-login/client-login';
import Persons from './../../components/persons/persons';
import Conversation from './../conversation/conversation';

import { joinSocket,
  leaveSocket,
  subscribeSocketErrors,
  unsubscribeSocketErrors, 
  unsubscribeNotifications, 
  subscribeNotifications } from '../../services/conversations.socket';

import './client.css';
class Client extends Component {
  constructor(props){
    super(props);
    this.state = {
      client:{},
      user:{},
    }

    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);

    subscribeSocketErrors((error) => {
      console.log('subscribeSocketErrors: ', error);
    });

    subscribeNotifications((notification) => {
      alert( Object.toString(notification) );
    });
  }

  componentWillUnmount(){
    unsubscribeSocketErrors();
    unsubscribeNotifications();
    if(!!this.state.client._id)
      leaveSocket(this.state.client._id);
  }

  async handleSubmitLogin(event) {
    event.preventDefault();
    try {
      const res = await axios.get(`http://localhost:3000/clients/${this.state.client.name}`);
      if(!!res.data.client){
        this.setState({ client: res.data.client });
        joinSocket(res.data.client._id);
      } else console.log('not found');
    } catch (error) {
      console.log(error);
    }
  }

  async handleSubmitRegister(event) {
    event.preventDefault();
    if(!this.state.client.name || !this.state.client.zodiac){
      console.log('Error: Fill in corresponding inputs');
      return;
    }
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
