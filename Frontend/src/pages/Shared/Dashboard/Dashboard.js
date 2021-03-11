import '../../../components/Shared/SideNavBar.css';

import SideNavBar from '../../../components/Shared/SideNavBar';
import Attendance from '../../Student/Attendance/Attendance';
import Timetable from '../../Student/Timetable/Timetable';
import StaffAttendance from '../../Staff/Attendance/StaffAttendance';
import DiaryList from '../Diary/DiaryList';
import StudentAssignments from '../../Student/Assignment/Assignments';
import CreateDiary from '../Diary/CreateDiary';
import { Route } from 'react-router-dom';
import Alertbox from '../../../components/Shared/Alertbox';

const Dashboard = (props) => (
    <>
        <Alertbox />

        <SideNavBar />
        <Route path="/attendance">
            {props.userType === "student" ? <Attendance /> : <StaffAttendance />}
        </Route>
        <Route exact path="/diary">
            <DiaryList />
        </Route>
        <Route path="/diary/create">
            <CreateDiary />
        </Route>
        <Route path="/timetable" exact>
            <Timetable />
        </Route>
        <Route path="/assignments" exact>
            <StudentAssignments />
        </Route>
    </>
);

export default Dashboard;