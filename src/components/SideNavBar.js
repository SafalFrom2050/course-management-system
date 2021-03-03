import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom'
import './SideNavBar.css';

function SideNavBar() {

    const auth = useContext(AuthContext);
    function logoutSession() {
        auth.logout();
    }

    return (
        // <!-- Navigation Starts -->
        <nav>
            <ul className="side-nav">

                {/* <!-- Account Preview Page -->
                        <!-- Any 1st item in the list is not highlighted on hover --> */}
                <li className="profile-preview">
                    <div className="account-preview-container">
                        <img className="profile-img-circular" src="favicon.ico" alt="profile"></img>
                        <h4>{auth.userName}</h4>
                        <h5 className="account-type">Student</h5>
                        <input type='button' value='Logout' onClick={logoutSession}></input>
                    </div>
                </li>

                <li className="modules">
                    <NavLink to="/modules">Modules</NavLink>
                </li>

                <li className="assignments">
                    <NavLink to="/assignments">Assignments</NavLink>
                </li>

                <li className="diary">
                    <NavLink to="/diary">Diary</NavLink>
                </li>

                <li className="attendance">
                    <NavLink to="/attendance">Attendance</NavLink>
                </li>

                <li className="timetable">
                    <NavLink to="/timetable">Timetable</NavLink>
                </li>

                <li className="personal-tutor">
                    <NavLink to="/personal-tutor">Personal Tutor</NavLink>
                </li>

                {/* <!-- Any last item in the list is sent to bottom and its color inverted --> */}
                <li className="dark-mode">
                    <h4>Dark mode</h4>
                </li>

            </ul>
        </nav>
    );
}

export default SideNavBar;