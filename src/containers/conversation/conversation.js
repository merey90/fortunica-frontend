import React, { Component } from 'react';
import axios from 'axios';

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
        this.handleConversationClick(this.state.conversations[0]);
      } else{
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleConversationClick(conversation){
    this.setState({
      conversation,
      showMessageForm: false
    });
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
    const listConversations = this.state.conversations.map(conversation =>
      <li className={conversation.hasNew? 'green' : ''} key={conversation._id} onClick={() => this.handleConversationClick(conversation)}>
        {conversation.title}
      </li>
    );

    return (
      <div className="conversation">
        <ul className="conversations-list">
          {this.props.forClient &&
            <li><button onClick={this.handleCompose}>Componse new</button></li>
          }
          {listConversations}
        </ul>
        <hr/>
        <div className="messaging-container">
          {!!this.state.conversation._id &&
            <Dialog hasAnswer={this.handleHasAnswer} conversation={this.state.conversation._id}/>
          }
          {(this.state.showMessageForm || (!this.state.hasAnswer && !this.props.forClient)) &&
            <MessageForm
              type={this.props.forClient ? 'question' : 'answer' }
              name={this.props.forClient ? this.props.user.name : this.props.client.name }
              message={this.state.message}
              handleSubmit={this.handleSubmit}
              handleInputChange={this.handleInputChange}/>
          }
        </div>
      </div>
    );
  }
}

export default Conversation;
