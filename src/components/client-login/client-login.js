import React from 'react';

import './client-login.css';
const ClientLogin = (props) => {
  return (
    <div className="client-login">
      <form className='login' onSubmit={props.handleSubmitLogin}>
        <input name="name"
          onChange={props.handleInputChange}
          type="text" placeholder="Enter your name"/>
        <button type="submit">Sign In</button>
      </form>
      <hr/>
      <form className='register' onSubmit={props.handleSubmitRegister}>
        <input name="name"
          onChange={props.handleInputChange}
          type="text" placeholder="Enter your name"/>
        <input name="zodiac" onChange={props.handleInputChange}  type="text" placeholder="Enter your zodiac"/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default ClientLogin;