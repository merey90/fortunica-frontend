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
      showMessageForm: false,
      hasAnswer: false
    }

    this.handleConversationClick = this.handleConversationClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCompose = this.handleCompose.bind(this);
    this.handleHasAnswer = this.handleHasAnswer.bind(this);
  }

  async componentDidMount(){
    try {
      const urlPath = `http://localhost:3000/conversations/${this.props.user._id}/${this.props.client._id}/${this.props.forClient}`;
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
    const type = this.props.forClient ? 'questions':'answers';
    const message = this.state.message;
    // If this is answer then attach conversation id
    if(!this.props.forClient) message.conversation = this.state.conversation._id;
    try {
      const res = await axios.post(`http://localhost:3000/${type}/`, message);
      

      if(!!res.data.conversation){
        this.setState({
          message: {},
          conversations: [
            res.data.conversation,
            ...this.state.conversations
          ]
        });
        this.handleConversationClick(res.data.conversation);
      } else if(!!res.data.answer){
        this.setState({
          message: {}
        });
        const conv = this.state.conversation;
        // Refresh Dialog Box
        /**
         * TODO: Disgusting workaround, need to refactor
         */
        this.handleConversationClick({});
        this.handleConversationClick(conv);
      } else
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

  handleHasAnswer(hasAnswer){
    this.setState({
      hasAnswer
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
            {this.props.forClient &&
              <li><button onClick={this.handleCompose}>Componse new</button></li>
            }
            {listConversations}
          </ul>
        </div>
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
