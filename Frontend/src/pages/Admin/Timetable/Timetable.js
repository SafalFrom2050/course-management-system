/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import './Timetable.css';
import React, { useState, useEffect, useContext } from 'react';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

import { AuthContext } from '../../../contexts/AuthContext';
import { useHttpClient } from '../../../hooks/http-hook';

export default function Timetable() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [activeBtn, setActiveBtn] = useState('Sunday');

  const [info, setInfo] = useState({
    course_id: '',
    module_id: '',
    level: '1',
    class_type: 'Lecture',
    start_time: '00:00',
    end_time: '00:00',
  });

  const showAlertBox = useAlertBoxShowMsg();
  const auth = useContext(AuthContext);
  const { sendRequest, error } = useHttpClient();

  useEffect(() => {
    loadCourses();
    downloadModules('101');
  }, []);

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
      showAlertBox('Network error. try again.', 2000);
    }
    setCourses(result.data);
    setInfo({ ...info, course_id: result.data[0].course_id });
  };

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
    setModules(result.data);
    setInfo({ ...info, module_id: result.data[0].module_id });
  };

  const buttonClickHandler = (day) => {
    setActiveBtn(day);
  };

  return (
    <div className="timetable-container">

      <div className="class-information">
        <div className="heading">Classes</div>

        <div className="class-list">
          <label htmlFor="modules">Select Course</label>
          <select
            name="modules"
            id="modules-selector"
            onChange={(e) => {
              setInfo({ ...info, course_id: e.target.value });
              downloadModules(e.target.value);
            }}
            style={{ width: '50%', marginLeft: '0' }}
          >
            {courses.map((item) => <option value={item.course_id}>{`${item.course_name} - ${item.course_id}`}</option>)}

          </select>

          <label htmlFor="modules">Select Module</label>
          <select
            name="modules"
            id="modules-selector"
            onChange={(e) => {
              setInfo({ ...info, module_id: e.target.value });
            }}
            style={{ width: '50%', marginLeft: '0' }}
          >
            {modules.map((item) => <option value={item.module_id}>{`${item.module_name} - ${item.module_id}`}</option>)}

          </select>

          <label htmlFor="modules">Level</label>
          <select
            name="modules"
            id="modules-selector"
            onChange={(e) => {
              setInfo({ ...info, level: e.target.value });
            }}
            style={{ width: '35%', marginLeft: '0' }}
          >
            <option key={1} value="1">1</option>
            <option key={2} value="2">2</option>
            <option key={3} value="3">3</option>
            <option key={4} value="4">4</option>
            <option key={5} value="5">5</option>
            <option key={6} value="6">6</option>

          </select>

          <label htmlFor="modules">Class Type</label>
          <select
            name="modules"
            id="modules-selector"
            onChange={(e) => {
              setInfo({ ...info, class_type: e.target.value });
            }}
            style={{ width: '35%', marginLeft: '0' }}
          >
            <option key={1} value="Lecture">Lecture</option>
            <option key={2} value="Tutorial">Tutorial</option>

          </select>
          <form className="class-item">
            <div className="second-row">
              <label>Start Time</label>
              <input
                type="time"
                id="start-time"
                className="start-time"
                value={info.start_time}
                placeholder="00:00"
                onChange={(e) => {
                  setInfo({ ...info, start_time: e.target.value });
                }}
                style={{ width: '40%' }}
              />
              <label>End Time</label>
              <input
                type="time"
                id="end-time"
                className="end-time"
                value={info.end_time}
                onChange={(e) => {
                  setInfo({ ...info, end_time: e.target.value });
                }}
                placeholder="00:00"
                style={{ width: '40%' }}
              />
              <button type="submit">Save</button>
            </div>
          </form>

          <button type="submit">Add New</button>
        </div>
      </div>

      <div className="days-selector">
        <div className="heading">Days</div>
        <div className="days-button-list">
          <button
            type="button"
            className={activeBtn === 'Sunday' ? 'selected-btn' : null}
            onClick={() => { buttonClickHandler('Sunday'); }}
          >
            Sunday
          </button>
          <button
            type="button"
            className={activeBtn === 'Monday' ? 'selected-btn' : null}
            onClick={() => { buttonClickHandler('Monday'); }}
          >
            Monday
          </button>
          <button
            type="button"
            className={activeBtn === 'Tuesday' ? 'selected-btn' : null}
            onClick={() => { buttonClickHandler('Tuesday'); }}
          >
            Tuesday
          </button>
          <button
            type="button"
            className={activeBtn === 'Wednesday' ? 'selected-btn' : null}
            onClick={() => { buttonClickHandler('Wednesday'); }}
          >
            Wednesday
          </button>
          <button
            type="button"
            className={activeBtn === 'Thursday' ? 'selected-btn' : null}
            onClick={() => { buttonClickHandler('Thursday'); }}
          >
            Thursday
          </button>
          <button
            type="button"
            className={activeBtn === 'Friday' ? 'selected-btn' : null}
            onClick={() => { buttonClickHandler('Friday'); }}
          >
            Friday
          </button>
          <button
            type="button"
            className={activeBtn === 'Saturday' ? 'selected-btn' : null}
            onClick={() => { buttonClickHandler('Saturday'); }}
          >
            Saturday
          </button>
        </div>
      </div>
    </div>
  );
}
