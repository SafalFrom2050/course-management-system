import SideNavBar from '../../../components/Shared/SideNavBar';
import Attendance from '../../Student/Attendance/Attendance';
import StaffAttendance from '../../Staff/Attendance/StaffAttendance';
import { Route } from 'react-router-dom';

const Dashboard = (props) => (

    <>
        <SideNavBar />
        <Route path="/attendance">
            {props.userType === "student" ? <Attendance /> : <StaffAttendance />}
        </Route>

    </>
);

export default Dashboard;