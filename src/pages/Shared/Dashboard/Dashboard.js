import SideNavBar from '../../../components/Shared/SideNavBar';
import Attendance from '../../Student/Attendance/Attendance';
import StaffAttendance from '../../Staff/Attendance/StaffAttendance';
import DiaryList from '../Diary/DiaryList';
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
    </>
);

export default Dashboard;