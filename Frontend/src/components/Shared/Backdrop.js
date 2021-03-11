import React from 'react';
import ReactDOM from 'react-dom';
import './Backdrop.css';

const Backdrop = (props) => ReactDOM.createPortal(
  /*
    ARIA (Accessible Rich Internet Applications) defines a way to make
    Web content and Web applications more accessible to people with
    disabilities. The hidden attribute is new in HTML5 and tells
    browsers not to display the element. The aria-hidden property
    tells screen-readers if they should ignore the element.
  */

  <div aria-hidden="true" className="Backdrop" onClick={props.remove} onKeyPress={props.remove} />, document.getElementById('backdrop-hook'),
);

export default Backdrop;
