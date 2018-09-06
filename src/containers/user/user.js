import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

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
      notification:{},
    }

    this.handleSubmitUser = this.handleSubmitUser.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClientClick = this.handleClientClick.bind(this);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);

    subscribeSocketErrors((error) => {
      console.log('subscribeSocketErrors: ', error);
    });
    subscribeNotifications((notification) => {
      this.setState({
        notification
      });
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

  handleCloseNotification(){
    this.setState({
      notification: {}
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
        {!!this.state.notification.message &&
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={!!this.state.notification.message}
            autoHideDuration={15000}
            onClose={this.handleCloseNotification}
            message={<span >{
              `${this.state.notification.message}. 
              From ${this.state.notification.person}
              in conversation: 
              ${this.state.notification.conversation}`
            }</span>}
            action={
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleCloseNotification}
              >
                <Icon>close</Icon>
              </IconButton>
            }
          />
        }
      </div>
    );
  }

  renderUserForm(){
    return(
      <Paper className="user-login default-padding full-height" elevation={1}>
        <form onSubmit={this.handleSubmitUser}>
          <FormControl fullWidth>
            <TextField
                name="name"
                label="Name"
                onChange={this.handleNameChange}
                margin="normal"
              />
          </FormControl>
          <FormControl fullWidth>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit">Sign In/Up</Button>
          </FormControl>
        </form>
      </Paper>
    );
  }
}

export default User;
