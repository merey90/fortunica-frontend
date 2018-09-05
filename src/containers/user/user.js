import React, { Component } from 'react';
import axios from 'axios';

import Persons from './../../components/persons/persons';
import Conversation from './../conversation/conversation';

import { joinSocket,
  leaveSocket,
  subscribeSocketErrors,
  unsubscribeSocketErrors, 
  unsubscribeNotifications, 
  subscribeNotifications } from '../../services/conversations.socket';

import './user.css';
class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      client:{},
      user:{},
    }

    this.handleSubmitUser = this.handleSubmitUser.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClientClick = this.handleClientClick.bind(this);

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
    if(!!this.state.user._id)
      leaveSocket(this.state.user._id);
  }

  handleNameChange(event) {
    this.setState({
      user: {
        "name": event.target.value
      }
    });
  }

  async handleSubmitUser(event) {
    event.preventDefault();
    if(!this.state.user.name){
      console.log('Error: Fill in user name');
      return;
    }
    try {
      const res = await axios.get(`http://localhost:3000/users/${this.state.user.name}`);
      if(!!res.data.user){
        this.setState({ user: res.data.user });
        joinSocket(res.data.user._id);
      } else console.log('not found');
    } catch (error) {
      console.log(error);
    }
  }

  handleClientClick(client){
    this.setState({
      client
    });
  }

  render() {
    const userForm = this.renderUserForm();
    let page;
    if(!this.state.user._id)
      page = userForm;
    else if(!!this.state.user._id && !this.state.client._id)
      page = <Persons user={this.state.user._id}
                type="clients"
                onClick={this.handleClientClick}/>
    else if(!!this.state.client._id && !!this.state.user._id)
      page = <Conversation
                user={this.state.user}
                client={this.state.client}
                forClient={false}/>
    return (
      <div className="user">
        {page}
      </div>
    );
  }

  renderUserForm(){
    return(
      <form className='login' onSubmit={this.handleSubmitUser}>
        <input name="name"
          onChange={this.handleNameChange}
          type="text" placeholder="Enter your name"/>
        <button type="submit">Sign In/Up</button>
      </form>
    );
  }
}

export default User;
