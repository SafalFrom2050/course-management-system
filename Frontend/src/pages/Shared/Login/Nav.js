import { React } from 'react';
import './Nav.css';

function nav() {
  return (
    <div className="nav">
      <div className="logo"><img src="logo-extended.jpg" alt="Woodlands University Logo" /></div>
      <div className="login-message"><h3>Please login to continue...</h3></div>
    </div>
  );
}

export default nav;
