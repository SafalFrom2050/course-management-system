import '../../../components/Shared/SideNavBar.css';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import SideNavBar from '../../../components/Shared/SideNavBar';
import Attendance from '../../Student/Attendance/Attendance';
import Timetable from '../../Student/Timetable/Timetable';
import StaffAttendance from '../../Staff/Attendance/StaffAttendance';
import DiaryList from '../Diary/DiaryList';
import StudentModules from '../../Student/Modules/Modules';
import StudentAssignments from '../../Student/Assignment/Assignments';
import CreateAssignment from '../../Staff/Assignment/CreateAssignment';
import AssignmentSubmissions from '../../Staff/Assignment/AssignmentSubmissions';
import ViewSubmissions from '../../Staff/Assignment/ViewSubmissions';
import CreateDiary from '../Diary/CreateDiary';
import Alertbox from '../../../components/Shared/Alertbox';
import EditDairy from '../Diary/EditDiary';

const Dashboard = (props) => {
  const { userType } = props;
  return (
    <>
      <Alertbox />
      <SideNavBar />
      <Switch>
        <Route path="/modules">
          <StudentModules />
        </Route>
        <Route path="/attendance">
          {userType === 'student' ? <Attendance /> : <StaffAttendance />}
        </Route>
        <Route exact path="/diary">
          <DiaryList />
        </Route>
        <Route exact path="/diary/create">
          <CreateDiary />
        </Route>
        <Route exact path="/diary/edit/:id">
          <EditDairy />
        </Route>
        <Route path="/timetable" exact>
          <Timetable />
        </Route>
        <Route path="/assignments" exact>
          {userType === 'student' ? <StudentAssignments /> : <AssignmentSubmissions />}
        </Route>
        {userType === 'student' ? <Route path="/assignments/submit"><CreateAssignment /></Route> : null}

        { userType === 'staff' ? (
          <>
            <Route path="/assignments/create" exact>
              <CreateAssignment />
            </Route>
            <Route path="/assignments/view">
              <ViewSubmissions />
            </Route>
          </>
        ) : null}
        <Redirect to="/modules" />
      </Switch>

    </>
  );
};

Dashboard.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default Dashboard;
