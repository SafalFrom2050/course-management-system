import React from 'react';
import PropTypes from 'prop-types';

function PostAttendance(props) {
  const {
    module_name, semHandler, weekHandler, dateHandler, postHandler,
  } = props;

  return (
    <div className="class-attendance-item">
      <h2 className="heading">Post Attendance Form</h2>
      <div className="class-detail focus">
        <div className="class-heading">{module_name}</div>

        <div className="attendance-details-container">
          <div className="data-container">
            <div className="data-label data-label-focus">
              Semester:
              <select style={{ marginLeft: '15px', width: '50px' }} onChange={semHandler}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
            <br />
            <div className="data-label">
              Week:
              <select style={{ marginLeft: '45px', width: '50px' }} defaultValue="1" onChange={weekHandler}>
                <option value="1">1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
            <div className="data-label">
              Date:
              <input type="datetime-local" className="inp" onChange={dateHandler} />
            </div>
          </div>
          <button className="view-students-btn" type="submit" onClick={postHandler}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
PostAttendance.propTypes = {
  module_name: PropTypes.string.isRequired,
  semHandler: PropTypes.func.isRequired,
  weekHandler: PropTypes.func.isRequired,
  dateHandler: PropTypes.func.isRequired,
  postHandler: PropTypes.func.isRequired,
};

export default PostAttendance;
