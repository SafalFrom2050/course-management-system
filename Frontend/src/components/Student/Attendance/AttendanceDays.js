import React from 'react';
import PropTypes from 'prop-types';

function AttendanceDays(props) {
  const { present, number } = props;

  let className = 'day-mark-item';
  if (present) {
    className = `${className} present`;
  }
  return <div className={className}>{number > 0 ? number : null}</div>;
}

AttendanceDays.propTypes = {
  present: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
};

export default AttendanceDays;
