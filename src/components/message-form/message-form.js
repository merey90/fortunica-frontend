import React from 'react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import './message-form.css';
const MessageForm = (props) => {
  return (
      <form className='login' onSubmit={props.handleSubmit}>
        <h3>For {props.name}</h3>
        <br/>
        {props.type === 'question' &&
          <FormControl fullWidth>
            <TextField
                name="title"
                label="Title"
                onChange={props.handleInputChange}
                value={!!props.message.title ? props.message.title : '' }
                margin="normal"
              />
          </FormControl>
        }
        <FormControl fullWidth>
          <TextField multiline={true}
              rows={3}
              name="content"
              label="Content"
              placeholder="Type in message content"
              onChange={props.handleInputChange}
              value={!!props.message.content ? props.message.content : ''}
              margin="normal"
            />
        </FormControl>
        <FormControl fullWidth>
          <Button
            variant="contained"
            color="primary"
            type="submit">Send</Button>
        </FormControl>
      </form>
  );
}

export default MessageForm;