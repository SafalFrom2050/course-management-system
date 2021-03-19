/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

export default function ModuleItem(props) {
  const { heading, tutor, nextClass } = props;

  return (
    <div className="module-item">
      {/* <!-- module Detail, Active Item! --> */}
      <div className="module-detail">
        <div className="module-heading">{heading}</div>

        {/* <!-- Body information container --> */}
        <div className="body-container">
          <div className="data-label">
            Tutor
            <label className="data">{tutor}</label>
          </div>
          <div className="data-label">
            Next Class On
            <label className="data">{nextClass}</label>
          </div>
          <button className="action-btn" type="submit">View</button>
        </div>
      </div>
    </div>
  );
}

ModuleItem.propTypes = {
  heading: PropTypes.string.isRequired,
  tutor: PropTypes.string.isRequired,
  nextClass: PropTypes.string.isRequired,
};
