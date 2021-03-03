import SideNavBar from '../../components/SideNavBar';
import Attendance from '../Attendance/Attendance';
import { Route } from 'react-router-dom';

const Dashboard = () => (

    <>
        <SideNavBar />
        <Route path="/attendance">
            <Attendance />
        </Route>

    </>
);

export default Dashboard;