import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import Dialog from './../../components/dialog/dialog';
import MessageForm from '../../components/message-form/message-form';
import { postAnswer,
         postQuestion,
         subscribeToConversations,
         unsubscribeToConversations } from '../../services/conversations.socket';

import './conversation.css';
class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      conversation: {},
      message: {
        user: this.props.user._id,
        client: this.props.client._id
      },
      showMessageForm: false,
      hasAnswer: false
    }

    this.handleConversationClick = this.handleConversationClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCompose = this.handleCompose.bind(this);
    this.handleHasAnswer = this.handleHasAnswer.bind(this);

    this.fetchConversations = this.fetchConversations.bind(this);
  }

  componentDidMount(){
    this.fetchConversations(this.props.user._id, this.props.client._id, this.props.forClient);

    subscribeToConversations((conversations) => {
      if(!!conversations && conversations.length > 0){
        this.setState({
          conversations
        });
        this.handleConversationClick(conversations[0], 0);
      }
    });
  }

  componentWillUnmount(){
    unsubscribeToConversations();
  }

  async fetchConversations(user, client, forClient){
    const urlPath = `http://localhost:3000/conversations/${user}/${client}/${forClient}`;
    try {
      const res = await axios.get(urlPath);
      if(!!res.data && res.data.length > 0){
        this.setState({
          conversations: res.data
        });
        this.handleConversationClick(this.state.conversations[0], 0);
      } else{
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleConversationClick(conversation, index){
    this.setState({
      conversation,
      selectedCoversation: index,
      showMessageForm: false
    });
    if(conversation.hasNew){
      const conversations = this.state.conversations;
      conversations[index].hasNew = false;
      this.setState({
        conversations
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const message = this.state.message;
    // If this is answer then attach conversation id
    if(!this.props.forClient) message.conversation = this.state.conversation._id;

    this.props.forClient ? postQuestion(message) : postAnswer(message);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      message: {
        ...this.state.message,
        [name]: value
      }
    });
  }

  handleCompose(event){
    event.preventDefault();

    this.setState({
      conversation: {},
      showMessageForm: true
    });
  }

  handleHasAnswer(hasAnswer){
    this.setState({
      hasAnswer
    });
  }

  render() {
    const listConversations = this.state.conversations.map((conversation, i) => {
      let newClass = conversation.hasNew ? 'green' : '';
      return (
        <ListItem button className={'conversations-item '+newClass}
            key={conversation._id}
            selected={this.state.selectedCoversation === i}
            onClick={() => this.handleConversationClick(conversation, i)}
        >
          <ListItemText
            primary={conversation.title}
            secondary={moment(conversation.createdAt).format('LLL')}
          />
        </ListItem>
      )
    });

    return (
      <div className="conversation">
        <Grid container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={16}>
            <Grid item xs={4}>
              <Paper className="default-padding full-height" elevation={1}>
                {this.props.forClient &&
                  <Button variant="contained"
                    color="primary"
                    onClick={this.handleCompose}>Componse new</Button>
                }
                <List dense={true} className="conversations-list">
                  {listConversations}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Grid container
                direction="column"
                justify="center"
                alignItems="stretch"
                spacing={16}>
                <Slide 
                  direction="left"
                  in={!!this.state.conversation._id}
                  mountOnEnter unmountOnExit>
                  <Grid item>
                    <Dialog hasAnswer={this.handleHasAnswer}
                      conversation={this.state.conversation._id}
                      forClient={this.props.forClient}
                      userName={this.props.user.name}
                      clientName={this.props.client.name}/>
                  </Grid>
                </Slide>
                <Grid item>
                  <Slide direction="up" in={this.state.showMessageForm || (!this.state.hasAnswer && !this.props.forClient)} mountOnEnter unmountOnExit>
                    <Paper className="default-padding full-height" elevation={1}>
                      <MessageForm
                        type={this.props.forClient ? 'question' : 'answer' }
                        name={this.props.forClient ? this.props.user.name : this.props.client.name }
                        message={this.state.message}
                        handleSubmit={this.handleSubmit}
                        handleInputChange={this.handleInputChange}/>
                    </Paper>
                  </Slide>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      </div>
    );
  }
}

export default Conversation;
