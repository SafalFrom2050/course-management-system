/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { React } from 'react';

export default function ModuleItem(props) {
  const {
    module_name, module_level, module_id, module_credit, course_id, edit,
  } = props;
  return (
    <div className="module-item">
      <div className="module-detail">
        <div className="module-heading">
          {module_name}
          {' '}
          | Level
          {' '}
          {module_level}
          {' '}
          module
        </div>

        <div className="body-container">
          <div className="data-label">
            Module Id:
            <label className="data">
              {module_id}
              {' '}
            </label>
          </div>

          <div className="data-label">
            Course Id:
            <label className="data">
              {course_id}
              {' '}
            </label>
          </div>

          <div className="data-label">
            Credit Hour:
            <label className="data">{module_credit}</label>
          </div>

          <button className="action-btn" type="submit" onClick={edit}>Edit</button>
          <button className="action-btn" type="submit">Remove</button>
        </div>
      </div>
    </div>
  );
}
