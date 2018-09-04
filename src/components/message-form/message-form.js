import React from 'react';

import './message-form.css';
const MessageForm = (props) => {
  return (
      <form className='login' onSubmit={props.handleSubmit}>
        <h3>For {props.name}</h3>
        <br/>
        {props.type === 'question' &&
          <input name="title"
            type="text" placeholder="Type the question Title"
            value={!!props.message.title ? props.message.title : '' }
            onChange={props.handleInputChange}/>
        }
        <br/>
        <textarea name="content"
          onChange={props.handleInputChange}
          value={!!props.message.content ? props.message.content : ''}
          type="text" placeholder={"Type in your "+props.type}/>
        <button type="submit">Send</button>
        <br/>
      </form>
  );
}

export default MessageForm;