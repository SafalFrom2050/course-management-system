/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function StudentItem(props) {
  const {
    name, semester, lastConvo, messageHandler, lastMessage,
  } = props;

  return (
    <div className="student-item">
      <div className="student-detail">
        <div className="student-heading">{name}</div>

        <div className="body-container">
          <div className="body">
            Last message:
            {' '}
            {lastMessage}
          </div>
          <div className="data-label">
            Semester
            <label className="data">{semester}</label>

            Last Communication
            <label className="data">{lastConvo}</label>

          </div>

          <button className="message-student-btn" type="submit" onClick={messageHandler}>Message</button>
        </div>
      </div>
    </div>
  );
}
