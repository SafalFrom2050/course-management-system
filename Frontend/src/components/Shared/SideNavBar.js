import {
  React, useState, useContext, useEffect,
} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './SideNavBar.css';

function SideNavBar() {
  const [title, setTitle] = useState(GetCurrentTitle());
  const auth = useContext(AuthContext);

  useEffect(() => {
    document.title = title;
  }, [title]);

  function logoutSession() {
    auth.logout();
  }

  function GetCurrentTitle() {
    const route = useLocation().pathname.slice(1).split('/')[0];
    return route.charAt(0).toUpperCase() + route.slice(1);
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

          <li className="modules">
            <NavLink to="/modules" onClick={() => setTitle('Modules')}>Modules</NavLink>
          </li>

          <li className="assignments">
            <NavLink to="/assignments" onClick={() => setTitle('Assignments')}>Assignments</NavLink>
          </li>

          <li className="diary">
            <NavLink to="/diary" onClick={() => setTitle('Diary')}>Diary</NavLink>
          </li>

          <li className="attendance">
            <NavLink to="/attendance" onClick={() => setTitle('Attendance')}>Attendance</NavLink>
          </li>

          <li className="timetable">
            <NavLink to="/timetable" onClick={() => setTitle('Timetable')}>Timetable</NavLink>
          </li>

          <li className="personal-tutor">
            <NavLink to="/personal-tutor" onClick={() => setTitle('Personal Tutor')}>Personal Tutor</NavLink>
          </li>

          {/* <!-- Any last item in the list is sent to bottom and its color inverted --> */}
          <li className="dark-mode">
            <NavLink to="#" onClick={() => setTitle('Setting Dark Mode')}><h4>Dark mode</h4></NavLink>
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
