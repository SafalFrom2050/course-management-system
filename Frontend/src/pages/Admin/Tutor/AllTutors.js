/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import './AllTutors.css';
import {
  React, useContext, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { useHttpClient } from '../../../hooks/http-hook';
import TutorItem from '../../../components/Admin/Tutor/TutorItem';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

export default function AllTutors() {
  const [tutors, setTutors] = useState([]);
  const [courses, setCourses] = useState([]);

  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const showAlertBox = useAlertBoxShowMsg();
  const history = useHistory();

  useEffect(() => {
    downloadTutors('101');
    loadCourses();
  }, []);

  const downloadTutors = async (course_id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest(`http://localhost:5000/admin/getAllTutors?course_id=${course_id}`, 'GET', config).catch((err) => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      showAlertBox('Error while getting module. Try again..', 2000);
      return;
    }
    setTutors(result.data);
  };

  const redirectToEdit = (index) => {
    history.push({
      pathname: '/tutor/edit',
      tutorObj: tutors[index],
      mode: 'edit',
    });
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

  return (
    <div className="AllTutors">
      <div className="action-btn-container">
        <button className="create-module-btn" type="button" onClick={() => { history.push('/tutor/add'); }}>Add New +</button>
      </div>

      <div className="course-selector">
        <label htmlFor="course">Select Course</label>

        <select
          name="course"
          id="modules-selector"
          onChange={(e) => {
            downloadTutors(e.target.value);
          }}
        >
          {courses.map((item) => <option value={item.course_id}>{`${item.course_name} - ${item.course_id}`}</option>)}

        </select>
      </div>

      <div className="tutor-list">
        {tutors.map((item, index) => (
          <TutorItem
            staff_id={item.staff_id}
            name={item.name}
            surname={item.surname}
            email={item.email}
            address={item.address}
            role={item.role}
            date_of_join={item.date_of_join}
            key={item.staff_id}
            edit={() => { redirectToEdit(index); }}
          />
        ))}
      </div>
    </div>
  );
}
