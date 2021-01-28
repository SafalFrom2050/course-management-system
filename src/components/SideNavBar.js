import { useAuth } from '../hooks/auth-hook';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './SideNavBar.css';

function SideNavBar() {

    const { logout } = useAuth();
    const auth = useContext(AuthContext);
    function logoutSession() {
        logout();
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

                <li className="modules active">
                    <h4>Modules</h4>
                </li>

                <li className="assignments">
                    <h4>Assignments</h4>
                </li>

                <li className="diary">
                    <h4>Diary</h4>
                </li>

                <li className="attendance">
                    <h4>Attendance</h4>
                </li>

                <li className="timetable">
                    <h4>Timetable</h4>
                </li>

                <li className="personal-tutor">
                    <h4>Personal Tutor</h4>
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