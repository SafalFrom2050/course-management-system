/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './add-student.css';
import {
  React, useState, useContext, useEffect,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

import { AuthContext } from '../../../contexts/AuthContext';
import { useHttpClient } from '../../../hooks/http-hook';

function AddStudent() {
  const [courses, setCourses] = useState([]);
  const [info, setInfo] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    gender: 'Prefer Not to Say',
    date_of_birth: '',
    registration_year: '',
    student_status: 'Live',
    course_id: '101',
  });
  const [selectedCourse, setSelectedCourse] = useState();

  const showAlertBox = useAlertBoxShowMsg();
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const { mode, studentObj } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (window.location.pathname === '/students/edit' && !mode) {
      history.push('/students');
      return;
    }

    loadCourses();

    if (mode) loadData();
  }, []);

  const loadData = () => {
    // eslint-disable-next-line guard-for-in
    for (const key in studentObj) {
      studentObj[key] = `${studentObj[key]}`;
    }

    setInfo({ ...studentObj, date_of_birth: studentObj.date_of_birth.split('T')[0], registration_year: studentObj.registration_year.split('T')[0] });
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
    if (studentObj) {
      setSelectedCourse(studentObj.course_id);
      return;
    }
    setInfo({ ...info, course_id: result.data[0].course_id });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    let result;
    if (!mode) {
      result = await sendRequest('http://localhost:5000/admin/createStudent', 'POST', {
        ...info,
      }, config).catch((err) => {
        showAlertBox(err, 2000);
      });
    } else {
      result = await sendRequest('http://localhost:5000/admin/editStudentInfo', 'POST', {
        ...info,
        student_id: studentObj.student_id,
      }, config).catch((err) => {
        showAlertBox('Network error! Please try again later...', 2000);
      });
    }
    if (!result) {
      showAlertBox('Error adding/editing student. Try again with some changes.', 2000);
      return;
    }
    if (!mode) {
      const text = `${result.data.email}  ${result.data.password}`;
      navigator.clipboard.writeText(text);
      showAlertBox('Student added. Login info added to clipboard', 2000);
    } else {
      showAlertBox('Information edited', 2000);
    }
    history.push('/students');
  };

  return (
    <div className="student-submit-box">
      <div className="submit-student-label">{mode ? 'Edit Student' : 'Add Student'}</div>

      {/* <!-- .student Form > .student Detail > Form --> */}
      <div className="student-form">
        <div className="student-detail">
          {/* <!-- WHOLE CONTENTS --> */}
          <form onSubmit={formSubmitHandler}>
            <div className="compound-row-inputs">
              <label htmlFor="first-name">First Name</label>
              <input
                className="name-input"
                onChange={(e) => { setInfo({ ...info, name: e.target.value }); }}
                value={info.name}
                type="text"
                name=""
                id="first-name"
                placeholder="First Name"
                required
              />
            </div>
            <div className="compound-row-inputs">
              <label htmlFor="last-name">Last Name</label>
              <input
                className="name-input"
                onChange={(e) => { setInfo({ ...info, surname: e.target.value }); }}
                value={info.surname}
                type="text"
                name=""
                id="last-name"
                placeholder="Last Name"
                required
              />
            </div>

            <div className="compound-row-inputs">
              <label htmlFor="email">Email</label>
              <input
                className="name-input"
                onChange={(e) => { setInfo({ ...info, email: e.target.value }); }}
                value={info.email}
                type="email"
                name=""
                id="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="compound-row-inputs">
              <label htmlFor="phone">Phone</label>
              <input
                className="name-input"
                onChange={(e) => { setInfo({ ...info, phone: e.target.value }); }}
                value={info.phone}
                type="phone"
                name=""
                id="phone"
                placeholder="Phone"
                required
              />
            </div>
            {mode ? (
              <div className="compound-row-inputs">
                <label htmlFor="password">Password</label>
                <input
                  className="name-input"
                  onChange={(e) => { setInfo({ ...info, password: e.target.value }); }}
                  type="password"
                  name=""
                  id="password"
                  placeholder={mode ? '(Unchanged)' : 'New Password'}
                />
              </div>
            ) : null}

            <div className="compound-row-inputs">
              <label htmlFor="address">Address</label>
              <input
                className="name-input"
                onChange={(e) => { setInfo({ ...info, address: e.target.value }); }}
                value={info.address}
                type="address"
                name=""
                id="address"
                placeholder="Address"
                required
              />
            </div>

            <div className="compound-row-inputs">
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender-selector" onChange={(e) => { setInfo({ ...info, gender: e }); }}>
                {mode ? <option value={info.gender}>{info.gender}</option> : ''}
                <option value="M">M</option>
                <option value="F">F</option>
                <option value="Prefer Not To Say">Prefer Not To Say</option>
              </select>
            </div>

            <div className="compound-row-inputs">
              <label htmlFor="date">Date of Birth</label>
              <input
                className="name-input"
                onChange={(e) => { setInfo({ ...info, date_of_birth: e.target.value.split('T')[0] }); }}
                value={info.date_of_birth.split('T')[0]}
                type="date"
                name="date"
                id="dob"
                placeholder="Date Of Birth"
                required
              />
            </div>

            <div className="compound-row-inputs">
              <label htmlFor="date">Registration Year</label>
              <input
                className="name-input"
                onChange={(e) => { setInfo({ ...info, registration_year: e.target.value.split('T')[0] }); }}
                value={info.registration_year.split('T')[0]}
                type="date"
                name="date"
                id="dob"
                placeholder="Registration Year"
                required
              />
            </div>

            <div className="compound-row-inputs">
              <label htmlFor="student-status">Student Status</label>
              <select name="student-status" id="gender-selector" onChange={(e) => { setInfo({ ...info, student_status: e.target.value }); }}>
                {mode ? <option value={info.student_status}>{info.student_status}</option> : ''}
                <option value="Live">Live</option>
                <option value="Alumnus">Alumnus</option>
                <option value="Left">Left</option>
              </select>
            </div>

            {/* <!-- Other Options --> */}
            <div className="options-box">
              <h4 className="heading">Other Details</h4>

              {/* <!-- Course Selector --> */}
              <div className="selector">
                <label htmlFor="courses">Select Course</label>

                <select name="courses" id="courses-selector" onChange={(e) => { setInfo({ ...info, course_id: e.target.value }); }}>
                  {mode ? <option value={info.course_id}>{info.course_id}</option> : ''}
                  {courses.map((item) => <option key={item.course_id} value={item.course_id}>{`${item.course_name} - ${item.course_id}`}</option>)}
                </select>
              </div>

              {/* <!-- Save student --> */}
              <button className="save-student-btn" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
