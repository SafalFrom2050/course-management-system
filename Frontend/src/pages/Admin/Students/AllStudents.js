/* eslint-disable jsx-a11y/label-has-associated-control */
import './all-students.css';

import {
  React, useContext, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { useHttpClient } from '../../../hooks/http-hook';
import StudentItem from '../../../components/Admin/Students/StudentItem';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const showAlertBox = useAlertBoxShowMsg();
  const history = useHistory();

  useEffect(() => {
    downloadStudents('101');
    loadCourses();
  }, []);

  const downloadStudents = async (course_id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest(`http://localhost:5000/admin/getAllStudents?course_id=${course_id}`, 'GET', config).catch((err) => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      showAlertBox('Error while getting module. Try again..', 2000);
      return;
    }
    setStudents(result.data);
  };

  const loadCourses = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest('http://localhost:5000/admin/getAllCourses', 'GET', config).catch((err) => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      showAlertBox('Error fetching courses. Try again', 2000);
    }
    setCourses(result.data);
  };

  const redirectToEdit = (index) => {
    history.push({
      pathname: '/students/edit',
      student: students[index],
      mode: 'edit',
    });
  };

  return (
    <div className="AllStudents">
      <div className="action-btn-container">
        <button type="button" className="create-student-btn">Add New +</button>
      </div>

      <div className="course-selector">
        <label htmlFor="course">Select Course</label>

        <select
          name="course"
          id="modules-selector"
          onChange={(e) => {
            downloadStudents(e.target.value);
          }}
        >
          {courses.map((item) => <option value={item.course_id}>{`${item.course_name} - ${item.course_id}`}</option>)}

        </select>
      </div>

      <div className="student-list">
        {students.map((item, index) => (
          <StudentItem
            key={item.student_id}
            student_id={item.student_id}
            name={`${item.name} ${item.surname}`}
            course={item.course_id}
            email={item.email}
            status={item.student_status}
            address={item.address}
            phone={item.phone}
            gender={item.gender}
            registrationDate={item.registration_year.split('T')[0].replace('-', ' - ')}
            dob={item.date_of_birth.split('T')[0].replace('-', ' - ')}
            edit={() => { redirectToEdit(index); }}
          />
        ))}
      </div>

    </div>
  );
}

export default AllStudents;
