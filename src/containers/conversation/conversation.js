import React, { Component } from 'react';
import axios from 'axios';

import Dialog from './../../components/dialog/dialog';
import MessageForm from '../../components/message-form/message-form';

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
      showMessageForm: false
    }

    this.handleConversationClick = this.handleConversationClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCompose = this.handleCompose.bind(this);
  }

  async componentDidMount(){
    try {
      const urlPath = `http://localhost:3000/conversations/${this.props.user._id}/${this.props.client._id}/${this.props.forClient}`;
      const res = await axios.get(urlPath);
      if(!!res.data && res.data.length > 0){
        this.setState({
          conversations: res.data
        })
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
    const type = this.props.forClient ? 'questions':'answers';
    try {
      const res = await axios.post(`http://localhost:3000/${type}/`, this.state.message);
      if(!!res.data.conversation){
        this.setState({
          message: {},
          conversations: [
            res.data.conversation,
            ...this.state.conversations
          ]
        });
        this.handleConversationClick(res.data.conversation);
      }
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

  render() {
    const listConversations = this.state.conversations.map(conversation =>
      <li key={conversation._id} onClick={() => this.handleConversationClick(conversation)}>
        {conversation.title}
      </li>
    );

    return (
      <div className="conversation">
        <div className="conversations-list">
          <ul>
            <li><button onClick={this.handleCompose}>Componse new</button></li>
            {listConversations}
          </ul>
        </div>
        <hr/>
        <div className="messaging-container">
          {!!this.state.conversation._id &&
            <Dialog conversation={this.state.conversation._id}/>
          }
          {this.state.showMessageForm &&
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
