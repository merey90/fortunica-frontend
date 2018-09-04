import React, { Component } from 'react';
import axios from 'axios';

import './dialog.css';
class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: {}
    }
  }

  async componentDidMount(){
    try {
      const urlPath = `http://localhost:3000/conversations/${this.props.conversation}`;
      const res = await axios.get(urlPath);
      if(!!res.data){
        this.setState({
          dialog: res.data
        })
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
          <h3 className="answer">{this.state.dialog.question.content}</h3>
        }
      </div>
    );
  }
}

export default Dialog;
