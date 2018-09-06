import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
    if(!!this.props.conversation)
      this.getDialog(this.props.conversation);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.conversation!==nextProps.conversation && !!nextProps.conversation)
      this.getDialog(nextProps.conversation);
  }

  async getDialog(conversation){
    try {
      const urlPath = `http://localhost:3000/conversations/${conversation}/${this.props.forClient}`;
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
          <div className="dialog-question">
            <span className="dialog-info">
              {
                this.props.clientName 
                + ': '
                + moment(this.state.dialog.question.createdAt).format('LLL')
              }
            </span>
            <Card className="dialog-content">
              <CardContent>
                <h3>{this.state.dialog.question.content}</h3>
              </CardContent>
            </Card>
          </div>
        }
        {!!this.state.dialog.answer &&
          <div className="dialog-answer">
            <span className="dialog-info">
              {
                this.props.userName
                + ': '
                +moment(this.state.dialog.answer.createdAt).format('LLL')
              }
            </span>
            <Card className="dialog-content">
              <CardContent>
                <h3 className="answer">{this.state.dialog.answer.content}</h3>
              </CardContent>
            </Card>
          </div>
        }
      </div>
    );
  }
}

export default Dialog;
