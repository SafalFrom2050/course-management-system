/* eslint-disable no-unused-vars */
import './Messages.css';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import MessageItem from '../../../components/Shared/Messages/MessageItem';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';
import { AuthContext } from '../../../contexts/AuthContext';
import { useHttpClient } from '../../../hooks/http-hook';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [tutor, setTutor] = useState([]);
  const [student, setStudent] = useState([]);

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const showAlertBox = useAlertBoxShowMsg();
  const user = JSON.parse(localStorage.getItem('userData'));
  const location = useLocation().search;
  const id = new URLSearchParams(location).get('recipient_id');
  const history = useHistory();

  useEffect(() => {
    if (user.userType === 'student') {
      downloadTutorInfo();
    } else {
      downloadStudentInfo();
    }

    downloadMessagesHandler();
  }, []);

  const downloadMessagesHandler = async () => {
    const params = {
      userType: user.userType,
      recipient_id: id,
    };
    const result = await sendRequest('http://localhost:5000/common/getPersonalMessages', 'GET', {
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    }, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      return;
    }
    setMessages(result.data);
  };

  const downloadTutorInfo = async () => {
    const result = await sendRequest('http://localhost:5000/student/getPersonalTutorDetails', 'GET', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    }, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    setTutor(result.data);
  };

  const downloadStudentInfo = async () => {
    const result = await sendRequest('    http://localhost:5000/staff/getStudentInfo', 'GET', {
      params: {
        student_id: id,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    }, null).catch(() => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    setStudent(result.data);
  };

  const redirectToSendMessage = () => {
    history.push({
      pathname: '/personal-tutor/send',
      recipient_id: id,
    });
  };

  return (
    <>
      {tutor.length > 0 || student.length > 0 ? (
        <div className="message-list">
          <div className="level-seperator">
            <div>
              <h3>
                Conversation with &nbsp;
                {user.userType === 'staff' ? student[0].name : tutor[0].name}
                {user.userType === 'staff' ? student[0].surname : tutor[0].surname}
              </h3>
              <br />
              Messages
            </div>
          </div>
        </div>
      ) : null}

      {messages.map((item) => {
        let classHighLight;
        if (user.userType === 'student') {
          if (item.sent_by === user.student_id) {
            classHighLight = 'message-detail highlight';
          } else {
            classHighLight = 'message-detail';
          }
        } else if (item.sent_by === user.staff_id) {
          classHighLight = 'message-detail highlight';
        } else {
          classHighLight = 'message-detail';
        }
        return (
          <MessageItem
            title={item.title}
            message={item.message}
            sent_date={new Date(item.sent_date).toLocaleString()}
            classHighLight={classHighLight}
            redirect={redirectToSendMessage}
          />
        );
      })}
    </>
  );
}
