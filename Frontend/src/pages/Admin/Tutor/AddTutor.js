/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import './AddTutor.css';
import {
  React, useState, useContext, useEffect,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

import { AuthContext } from '../../../contexts/AuthContext';
import { useHttpClient } from '../../../hooks/http-hook';

export default function AddTutor() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [selected, setSelected] = useState({
    course: null,
    module: '1001',
  });
  const [info, setInfo] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    salary: 0,
    role: '',
  });

  const showAlertBox = useAlertBoxShowMsg();
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const history = useHistory();

  useEffect(() => {
    downloadModules('101');
    loadCourses();
  }, []);

  const downloadModules = async (course_id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest(`http://localhost:5000/admin/getAllModules?course_id=${course_id}`, 'GET', config).catch((err) => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      showAlertBox('Error while getting module. Try again..', 2000);
      return;
    }
    setSelected({ ...selected, module: result.data[0].module_id });
    setModules(result.data);
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
    setSelected({ ...selected, course: result.data[0].course_id });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest('http://localhost:5000/admin/createStaff', 'POST', {
      ...info,
      course_id: selected.course,
      module_id: selected.module,
    }, config).catch((err) => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      showAlertBox('Error fetching courses. Try again', 2000);
      return;
    }
    showAlertBox('Tutor added. Temporary password sent to the email address.', 2000);
    // TODO: Redirect to all tutors
  };

  return (
    <div className="tutor-submit-box">
      <div className="submit-tutor-label">Add Tutor</div>

      <div className="tutor-form">
        <div className="tut-detail">
          <form onSubmit={formSubmitHandler}>
            <div className="compound-row-inputs">
              <label htmlFor="first-name">First Name</label>
              <input
                onChange={(e) => { setInfo({ ...info, name: e.target.value }); }}
                className="name-input"
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
                onChange={(e) => { setInfo({ ...info, surname: e.target.value }); }}
                className="name-input"
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
                onChange={(e) => { setInfo({ ...info, email: e.target.value }); }}
                className="name-input"
                type="email"
                name=""
                id="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="compound-row-inputs">
              <label htmlFor="address">Address</label>
              <input
                onChange={(e) => { setInfo({ ...info, address: e.target.value }); }}
                className="name-input"
                type="address"
                name=""
                id="address"
                placeholder="Address"
                required
              />
            </div>

            <div className="compound-row-inputs">
              <label htmlFor="salary">Salary</label>
              <input
                onChange={(e) => { setInfo({ ...info, salary: e.target.value }); }}
                className="name-input"
                type="number"
                name=""
                id="salary"
                placeholder="Salary"
                required
              />
            </div>

            <div className="compound-row-inputs">
              <label htmlFor="role">Role</label>
              <input
                onChange={(e) => { setInfo({ ...info, role: e.target.value }); }}
                className="name-input"
                type="text"
                name=""
                id="role"
                placeholder="Role"
                required
              />
            </div>

            <div className="options-box">
              <h4 className="heading">Other Details</h4>

              <div className="selector">
                <label htmlFor="modules">Select Module</label>

                <select
                  name="modules"
                  id="modules-selector"
                  onChange={(e) => {
                    setSelected({ ...selected, module: e.target.value });
                  }}
                >
                  {modules.map((item) => <option key={item.module_id} value={item.module_id}>{`${item.module_name} - ${item.module_id}`}</option>)}
                </select>
              </div>

              <div className="selector">
                <label htmlFor="courses">Select Course</label>

                <select
                  name="modules"
                  id="modules-selector"
                  onChange={(e) => {
                    downloadModules(e.target.value);
                    setSelected({ ...selected, course: e.target.value });
                  }}
                >
                  {courses.map((item) => <option key={item.course_id} value={item.course_id}>{`${item.course_name} - ${item.course_id}`}</option>)}

                </select>
              </div>
            </div>
            <button className="save-tutor-btn" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
