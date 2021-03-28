import '../../../components/Shared/SideNavBar/SideNavBar.css';

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import SideNavBar from '../../../components/Shared/SideNavBar/SideNavBar';
import Attendance from '../../Student/Attendance/Attendance';
import Timetable from '../../Student/Timetable/Timetable';
import StaffAttendance from '../../Staff/Attendance/StaffAttendance';
import DiaryList from '../Diary/DiaryList';
import StudentModules from '../../Student/Modules/Modules';
import StudentModuleMaterials from '../../Student/Modules/ModuleMaterials';
import StudentTutor from '../../Student/PersonalTutor/PersonalTutor';

import StaffModules from '../../Staff/Modules/Modules';
import StaffModuleMaterials from '../../Staff/Modules/ModuleMaterials';
import StudentAssignments from '../../Student/Assignment/Assignments';
import CreateAssignment from '../../Staff/Assignment/CreateAssignment';
import AssignmentSubmissions from '../../Staff/Assignment/AssignmentSubmissions';
import ViewSubmissions from '../../Staff/Assignment/ViewSubmissions';
import CreateDiary from '../Diary/CreateDiary';
import Alertbox from '../../../components/Shared/AlertBox/Alertbox';
import EditDairy from '../Diary/EditDiary';
import PersonalTutor from '../../Staff/PersonalTutor/PersonalTutor';

import Messages from '../PerosnalMessages/Messages';

const Dashboard = (props) => {
  const { userType } = props;

  if (userType) {
    return (
      <>
        <Alertbox />
        <SideNavBar />
        <Switch>
          <Route exact path="/modules">
            {userType === 'student' ? <StudentModules /> : <StaffModules />}
          </Route>
          <Route exact path="/modules/materials/:module_id">
            {userType === 'student' ? <StudentModuleMaterials /> : <StaffModuleMaterials />}
          </Route>
          <Route path="/attendance">
            {userType === 'student' ? <Attendance /> : <StaffAttendance />}
          </Route>
          <Route exact path="/diary">
            <DiaryList />
          </Route>
          <Route exact path="/diary/create">
            <CreateDiary page="diary" />
          </Route>
          <Route exact path="/diary/edit/:id">
            <EditDairy />
          </Route>
          <Route path="/timetable" exact>
            <Timetable />
          </Route>
          <Route path="/personal-tutor/messages" exact>
            <Messages />
          </Route>
          <Route path="/personal-tutor/send">
            <CreateDiary page="message" />
          </Route>
          {userType === 'student'
            ? (
              <>
                <Route path="/personal-tutor" exact>
                  <StudentTutor />
                </Route>
                <Route path="/assignments" exact>
                  <StudentAssignments />
                </Route>
                <Route path="/assignments/submit">
                  <CreateAssignment />
                </Route>
              </>
            ) : null}

          { userType === 'staff' ? (
            <>
              <Route path="/personal-tutor" exact>
                <PersonalTutor />
              </Route>
              <Route path="/assignments" exact>
                <AssignmentSubmissions />
              </Route>
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
  }
  return null;
};

Dashboard.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default Dashboard;
