/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

export default function AssignmenList(props) {
  const {
    module_name, title, content, deadline, semester, view,
  } = props;
  return (
    <>
      <div className="assignment-item">
        <div className="assignment-detail assignment-detail-full-text">
          <div className="assignment-heading">
            {module_name}
            {'    '}
            |
            {'    '}
            {title}
          </div>

          <div className="body-container">
            <div className="body">
              {content}

            </div>
            <div className="data-label">
              Assignment Due
              <label className="data">{new Date(deadline).toUTCString()}</label>
              <br />
              <br />
              Semester
              <label className="data">{semester}</label>
            </div>
          </div>

          <button className="action-btn" type="submit" onClick={view}>View Submissions</button>
        </div>
      </div>
    </>
  );
}

AssignmenList.propTypes = {
  module_name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  semester: PropTypes.number.isRequired,
};
