import {useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { NavLink, useLocation } from 'react-router-dom'
import './SideNavBar.css';


function SideNavBar() {

    const [title, setTitle] = useState(getCurrentTitle());
    const auth = useContext(AuthContext);

    function logoutSession() {
        auth.logout();
    }

    function getCurrentTitle(){
        let route = useLocation().pathname.slice(1);

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
                        <img className="profile-img-circular" src="favicon.ico" alt="profile"></img>
                        <h4>{auth.userName}</h4>
                        <h5 className="account-type" style={{ textTransform: "capitalize" }}>{auth.userType}</h5>
                        <input type='button' value='Logout' onClick={logoutSession}></input>
                    </div>
                </li>

                <li className="modules" onClick={()=>setTitle("Modules")} >
                    <NavLink to="/modules">Modules</NavLink>
                </li>

                <li className="assignments" onClick={()=>setTitle("Assignments")}>
                    <NavLink to="/assignments">Assignments</NavLink>
                </li>

                <li className="diary" onClick={()=>setTitle("Diary")}>
                    <NavLink to="/diary">Diary</NavLink>
                </li>

                <li className="attendance" onClick={()=>setTitle("Attendance")}>
                    <NavLink to="/attendance">Attendance</NavLink>
                </li>

                <li className="timetable" onClick={()=>setTitle("Timetable")}>
                    <NavLink to="/timetable">Timetable</NavLink>
                </li>

                <li className="personal-tutor" onClick={()=>setTitle("Personal Tutor")}>
                    <NavLink to="/personal-tutor">Personal Tutor</NavLink>
                </li>

                {/* <!-- Any last item in the list is sent to bottom and its color inverted --> */}
                <li className="dark-mode">
                    <h4>Dark mode</h4>
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