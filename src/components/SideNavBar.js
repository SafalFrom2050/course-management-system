import './SideNavBar.css';
import {useAuth} from '../contexts/AuthContext';
import {useHistory} from 'react-router-dom';

function sideNavBar(){

    const {currentUser, logout} = useAuth();
    const history = useHistory();

    // Checking if the user is logged in...
    if(!currentUser) history.push('/login');


    function logoutSession(){
        logout();
        if(!currentUser) history.push('/login');
        console.log(currentUser.username);
    }

    return(
        // <!-- Navigation Starts -->
        <nav>
            <ul className="side-nav">

                {/* <!-- Account Preview Page -->
                        <!-- Any 1st item in the list is not highlighted on hover --> */}
                <li className="profile-preview">
                    <div className="account-preview-container">
                        <img className="profile-img-circular" src="favicon.ico" alt="profile picture"></img>
                        <h4>Safal Sharma</h4>
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

export default sideNavBar;