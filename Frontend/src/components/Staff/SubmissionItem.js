/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';

export default function SybmissionItem(props) {
  const {
    name, surname, content, submission_date, title,
  } = props;
  return (
    <div className="assignment-item">
      ,
      <div className="assignment-detail assignment-detail-full-text">
        <div className="assignment-heading">
          {name}
          {' '}
          {surname}
        </div>
        <p>{title}</p>
        <div className="body-container">
          <div className="body">
            {content}
            <br />
          </div>
        </div>
        <div className="data-label">
          Submission date:
          <label className="data">{new Date(submission_date).toUTCString()}</label>
        </div>
        <button className="action-btn" type="submit">Mark</button>
      </div>
    </div>
  );
}
