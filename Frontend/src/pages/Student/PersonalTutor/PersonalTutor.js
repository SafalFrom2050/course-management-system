/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './PersonalTutor.css';

import React, { useContext, useEffect, useState } from 'react';
import { useHttpClient } from '../../../hooks/http-hook';
import { AuthContext } from '../../../contexts/AuthContext';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

export default function PersonalTutor() {
  const [tutor, setTutor] = useState([]);
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const showAlertBox = useAlertBoxShowMsg();

  useEffect(() => {
    downloadTutorInfo();
  }, []);

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

  return (
    <>
      {tutor.length > 0
        ? (
          <div className="tutor-detail">
            <img
              className="profile-img-circular"
              src="images/profile.jpg"
              alt="user pic"
            />
            <div className="heading">
              <h3>{`${tutor[0].name} ${tutor[0].surname}`}</h3>
            </div>

            <div className="details">
              <div className="body">{tutor[0].role}</div>
              <div className="row">
                <h4>
                  Last Message:
                </h4>
                <p>
                &nbsp;  &nbsp;
                  {tutor[0].message}
                </p>
              </div>
              <div className="row">
                <h4>Email</h4>
                <div className="data">{tutor[0].email}</div>

                <h4>Last Communication</h4>
                <div className="data">{new Date(tutor[0].sent_date).toDateString()}</div>
              </div>
            </div>

            <div className="actions">
              <button className="action-btn" type="button">Message</button>
            </div>
          </div>
        ) : <h2>Personal Tutor not found.. Try again.</h2>}
    </>
  );
}
