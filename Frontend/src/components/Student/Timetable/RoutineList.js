/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function RoutineList(props) {
  const {
    module_name, name, surname, start_time, end_time, class_type,
  } = props;

  return (
    <div className="class-item">
      <div className="first-row">
        <div className="title">{module_name}</div>
        <div className="tutor">
          By
          {` ${name} ${surname}`}
        </div>
      </div>

      <div className="second-row">
        <label>Start Time</label>
        <div className="start-time">{start_time}</div>
        <label>End Time</label>
        <div className="end-time">{end_time}</div>
        {class_type ? (
          <>
            <div className="end-time">{class_type}</div>
          </>
        ) : null}

      </div>
    </div>
  );
}
RoutineList.propTypes = {
  module_name: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  start_time: PropTypes.string.isRequired,
  end_time: PropTypes.string.isRequired,
  class_type: PropTypes.string.isRequired,
};

export default RoutineList;
