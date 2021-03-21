/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useHttpClient } from '../../../hooks/http-hook';
import { AuthContext } from '../../../contexts/AuthContext';

export default function ModuleItem(props) {
  const {
    moduleId, heading, tutor, nextClass,
  } = props;
  const [stateNextClass, setStateNextClass] = useState(nextClass);

  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => (
    getNextClassTime()
  ), []);

  async function getNextClassTime() {
    const result = await sendRequest(`http://localhost:5000/student/modules/getNearestClassTime?module_id=${moduleId}`, 'GET', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }, null);

    if (!result.data.start_time) {
      return;
    }

    const time = `${result.data.day}, ${result.data.start_time.split(':')[0]} : ${result.data.start_time.split(':')[1]}`;
    setStateNextClass(time);
  }

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
            <label className="data">{stateNextClass}</label>
          </div>
          <button className="action-btn" type="submit">View</button>
        </div>
      </div>
    </div>
  );
}

ModuleItem.propTypes = {
  moduleId: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  tutor: PropTypes.string.isRequired,
  nextClass: PropTypes.string.isRequired,
};
