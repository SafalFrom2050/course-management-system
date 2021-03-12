import React from 'react';
import './Alertbox.css';
import { useAlertBoxMsg } from '../../contexts/AlertBoxContext';

function Alertbox() {
  const alertMsg = useAlertBoxMsg();

  if (!alertMsg) return ('');
  return (
    <div className="alert-box"><h3>{alertMsg}</h3></div>
  );
}

export default Alertbox;
