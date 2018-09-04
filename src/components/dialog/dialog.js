import React, { Component } from 'react';
import axios from 'axios';

import './dialog.css';
class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: {}
    }

    this.getDialog = this.getDialog.bind(this);
  }

  componentDidMount(){
    this.getDialog(this.props.conversation);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.conversation!==nextProps.conversation)
      this.getDialog(nextProps.conversation);
  }

  async getDialog(conversation){
    try {
      const urlPath = `http://localhost:3000/conversations/${conversation}`;
      const res = await axios.get(urlPath);
      if(!!res.data){
        this.setState({
          dialog: res.data
        });

        this.props.hasAnswer(!!this.state.dialog.answer);
      } else{
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="dialog">
        {!!this.state.dialog.question &&
          <h3 className="question">{this.state.dialog.question.content}</h3>
        }
        {!!this.state.dialog.answer &&
          <h3 className="answer">{this.state.dialog.answer.content}</h3>
        }
      </div>
    );
  }
}

export default Dialog;
