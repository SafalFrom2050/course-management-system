import './SideNavBar.css';
import {
  React, useState, useContext, useEffect,
} from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks, faBook, faCheckCircle, faBookOpen, faCalendarWeek, faChalkboardTeacher, faAdjust, faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../contexts/AuthContext';

function SideNavBar() {
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [title, setTitle] = useState('');
  const auth = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    setCurrentTitleAndActiveMenuItem();
  }, []);

  function logoutSession() {
    auth.logout();
  }

  function setCurrentTitleAndActiveMenuItem() {
    const route = location.pathname.slice(1).split('/')[0];
    setActiveMenuItem(route);
    const head = route.charAt(0).toUpperCase() + route.slice(1);
    setTitle(head);
  }

  return (
  // <!-- Navigation Starts -->
    <>

      <nav>
        <ul className="side-nav">

          {/* <!-- Account Preview Page -->
                        <!-- Any 1st item in the list is not highlighted on hover --> */}
          <li className="profile-preview">
            <div className="account-preview-container">
              <img className="profile-img-circular" src="favicon.ico" alt="profile" />
              <h4>{auth.userName}</h4>
              <h5 className="account-type" style={{ textTransform: 'capitalize' }}>{auth.userType}</h5>
              <input type="button" value="Logout" onClick={logoutSession} />
            </div>
          </li>

          {auth.userType !== 'admin' ? (
            <>
              <li className={`modules ${activeMenuItem === 'modules' ? 'active' : ''}`}>
                <NavLink
                  to="/modules"
                  onClick={() => {
                    setTitle('Modules');
                    setActiveMenuItem('modules');
                  }}
                >
                  <FontAwesomeIcon icon={faBookOpen} className="icons" />
                  Modules
                </NavLink>
              </li>

              <li className={`assignments ${activeMenuItem === 'assignments' ? 'active' : ''}`}>
                <NavLink
                  to="/assignments"
                  onClick={() => {
                    setTitle('Assignments');
                    setActiveMenuItem('assignments');
                  }}
                >
                  <FontAwesomeIcon icon={faTasks} className="icons" />
                  Assignments
                </NavLink>
              </li>

              <li className={`diary ${activeMenuItem === 'diary' ? 'active' : ''}`}>
                <NavLink
                  to="/diary"
                  onClick={() => {
                    setTitle('Diary');
                    setActiveMenuItem('diary');
                  }}
                >
                  <FontAwesomeIcon icon={faBook} className="icons" />
                  Diary
                </NavLink>
              </li>

              <li className={`attendance ${activeMenuItem === 'attendance' ? 'active' : ''}`}>
                <NavLink
                  to="/attendance"
                  onClick={() => {
                    setTitle('Attendance');
                    setActiveMenuItem('attendance');
                  }}
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="icons" />
                  Attendance
                </NavLink>
              </li>

              <li className={`timetable ${activeMenuItem === 'timetable' ? 'active' : ''}`}>
                <NavLink
                  to="/timetable"
                  onClick={() => {
                    setTitle('Timetable');
                    setActiveMenuItem('timetable');
                  }}
                >
                  <FontAwesomeIcon icon={faCalendarWeek} className="icons" />
                  Timetable
                </NavLink>
              </li>

              <li className={`personal-tutor ${activeMenuItem === 'personal-tutor' ? 'active' : ''}`}>
                <NavLink
                  to="/personal-tutor"
                  onClick={() => {
                    setTitle('Personal Tutor');
                    setActiveMenuItem('personal-tutor');
                  }}
                >
                  <FontAwesomeIcon icon={faChalkboardTeacher} className="icons" />
                  Personal Tutor
                </NavLink>
              </li>

              <li className={`personal-tutor ${activeMenuItem === 'grades' ? 'active' : ''}`}>
                <NavLink
                  to="/grades"
                  onClick={() => {
                    setTitle('Grades');
                    setActiveMenuItem('grades');
                  }}
                >
                  <FontAwesomeIcon icon={faGraduationCap} className="icons" />
                  Grades
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className={`modules ${activeMenuItem === 'modules' ? 'active' : ''}`}>
                <NavLink
                  to="/modules"
                  onClick={() => {
                    setTitle('Modules');
                    setActiveMenuItem('modules');
                  }}
                >
                  <FontAwesomeIcon icon={faBookOpen} className="icons" />
                  Modules
                </NavLink>
              </li>
            </>
          )}

          {/* <!-- Any last item in the list is sent to bottom and its color inverted --> */}
          <li className="dark-mode">
            <NavLink to="#" onClick={() => setTitle('Setting Dark Mode')}>
              <FontAwesomeIcon icon={faAdjust} className="icons" />
              <h4>Dark mode</h4>
            </NavLink>
          </li>

        </ul>
      </nav>
      {/* <!-- Title Page (Same on all pages) --> */}
      <div className="top-nav">
        <div className="page-title">
          <h2>{title}</h2>
        </div>
      </div>
    </>
  );
}

export default SideNavBar;
