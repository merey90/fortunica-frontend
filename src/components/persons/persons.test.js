import React from 'react';
import ReactDOM from 'react-dom';
import Persons from './persons';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Persons />, div);
  ReactDOM.unmountComponentAtNode(div);
});
