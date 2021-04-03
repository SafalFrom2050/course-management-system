/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React from 'react';

export default function FeedbackItem(props) {
  const {
    module_name, module_id, feedback, staff, semester,
  } = props;
  return (

    <div className="module-item">
      <div className="module-detail">
        <div className="module-heading">
          {module_name}
          &nbsp; | &nbsp;
          {module_id}
          &nbsp;
          {' '}
          | Semester&nbsp;&nbsp;
          {semester}
        </div>

        <div className="body-container">
          <div className="body">
            {feedback}
          </div>

          <div className="data-label">
            Tutor
            <label className="data">{staff}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
