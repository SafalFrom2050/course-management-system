import React from 'react';
import PropTypes from 'prop-types';

import './StudentTable.css';

const StudentTable = (props) => {
  const { students } = props;

  return (
    <table>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
        <th>Attendance Time</th>
      </tr>
      {students.map(((item) => {
        const time = new Date(item.attendance_time);
        const date = time.toUTCString();
        return (
          <tr>
            <td>{item.name}</td>
            <td>{item.surname}</td>
            <td>{item.email}</td>
            <td>{date}</td>
          </tr>
        );
      }))}

    </table>
  );
};
StudentTable.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StudentTable;
