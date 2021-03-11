import React from 'react';
import PropTypes from 'prop-types';

const ActiveAttendance = (props) => {
  const {
    module_name, week, time, click,
  } = props;

  return (
    <div className="class-attendance-item">

      <div className="heading">Current Class: Attendance Required!</div>

      <div className="class-detail class-detail-active">
        <div className="class-heading">{module_name}</div>
        <p style={{ marginTop: '10px' }}>
          <strong>
            Week
            {week}
          </strong>
          {' '}
        </p>
        <div className="days-container" style={{ marginTop: '0' }}>
          <p>
            To be submitted by:
            <strong>{time}</strong>
          </p>
          <button type="button" className="day-check-btn" onClick={click}>Attend</button>
        </div>
      </div>
    </div>
  );
};

ActiveAttendance.propTypes = {
  module_name: PropTypes.string.isRequired,
  week: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};

export default ActiveAttendance;
