/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function ClassAttendance(props) {
  const {
    module_name, totalStudents, week, date, handler, current,
  } = props;
  return (
    <div className="class-attendance-item">
      <div className="class-detail">
        <div className="class-heading">{module_name}</div>

        <div className="attendance-details-container">
          <div className="data-container">
            <div className="data-label data-label-focus">
              Present Students:
              <label className="data">{totalStudents}</label>
            </div>
            <br />
            <div className="data-label">
              Week :
              <label className="data">{week}</label>
            </div>
            <div className="data-label">
              Date:
              <label className="data">{date}</label>
            </div>
          </div>

          <button typeof="button" className="view-students-btn" type="submit" onClick={handler}>
            {current ? 'Stop' : 'View Students'}
          </button>
        </div>
      </div>
    </div>
  );
}

ClassAttendance.propTypes = {
  module_name: PropTypes.string.isRequired,
  totalStudents: PropTypes.number.isRequired,
  week: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  current: PropTypes.bool.isRequired,
};

export default ClassAttendance;
