import React from 'react';
import PropTypes from 'prop-types';

import AttendanceDays from './AttendanceDays';

function AttendanceDetail(props) {
  const { module_name, attendance_status } = props;

  let count = 0;
  return (
    <div className="class-attendance-item">
      <div className="class-detail">
        <div className="class-heading">{module_name}</div>
        <div className="days-container">
          <div className="label">Days:</div>

          <div className="day-marks">
            {attendance_status.map((item, index) => (
              // eslint-disable-next-line no-plusplus
              <AttendanceDays key={++count} present={!!item} number={index} />))}
          </div>
        </div>
      </div>
    </div>

  );
}

AttendanceDetail.propTypes = {
  module_name: PropTypes.string.isRequired,
  attendance_status: PropTypes.array.isRequired,
};

export default AttendanceDetail;
