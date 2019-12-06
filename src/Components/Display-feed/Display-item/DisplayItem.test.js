import React from 'react';
import ReactDOM from 'react-dom';
import DisplayItem from './DisplayItem';
import { BrowserRouter} from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><DisplayItem imageAddress={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc53S16cGD_TTr80tPoxgIv5lsF3t52XjOuHV4Rognqp5qBdtO8A&s'} upvotes='20' /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
