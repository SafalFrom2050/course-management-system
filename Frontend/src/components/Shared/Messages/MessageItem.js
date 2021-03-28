/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function MessageItem(props) {
  const {
    title, message, sent_date, classHighLight, redirect,
  } = props;

  return (
    <div className="message-item">
      <div className={classHighLight}>
        <div className="message-heading">{title}</div>

        <div className="body-container">
          <div className="body">
            {message}
          </div>
          <div className="data-label">
            <label className="data">{sent_date}</label>

          </div>

          <button className="message-student-btn" type="submit" onClick={redirect}>Reply</button>
        </div>
      </div>
    </div>
  );
}
