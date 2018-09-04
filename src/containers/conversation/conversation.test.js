import React from 'react';
import ReactDOM from 'react-dom';
import Conversation from './conversation';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Conversation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
