/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function RoutineList(props) {
  const {
    module_name, name, surname, start_time, end_time, semester,
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
        {semester ? (
          <>
            <label>Sem</label>
            <div className="end-time">{semester}</div>
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
  semester: PropTypes.number.isRequired,
};

export default RoutineList;
