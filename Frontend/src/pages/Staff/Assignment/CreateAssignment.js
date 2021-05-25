/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { useHttpClient } from '../../../hooks/http-hook';
import './CreateAssignment.css';

export default function CreateAssignment(props) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    deadline: '',
    semester: '1',
  });
  const [links, setLinks] = useState([]);
  const [linkText, setLinkText] = useState('');
  const [linkActive, setLinkActive] = useState(false);
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('userData'));

  const linkHandler = () => {
    setLinkActive(!linkActive);
    if (linkActive) {
      addNewLinkHandler();
    }
  };

  const addNewLinkHandler = () => {
    if (linkText === '') {
      return;
    }
    setLinks((prevState) => {
      const array = [...prevState];
      array.push(linkText);
      return array;
    });
    setLinkText('');
  };

  const removeLink = (text) => {
    const array = [];
    links.forEach((element) => {
      if (element !== text) {
        array.push(element);
      }
    });
    setLinks(array);
  };

  const addAssignment = async () => {
    const obj = { ...formData };
    let endPoint = 'http://localhost:5000/staff/addAssignment';
    if (user.userType === 'staff' && !props.materials) {
      if (formData.title === '' || formData.content === '' || formData.deadline === '' || formData.semester === '') {
        return;
      }
    } else if (user.userType === 'student') {
      endPoint = 'http://localhost:5000/student/submitAssignment';
      obj.assignment_id = location.assignment_id;
      obj.student_id = user.student_id;
      if (formData.title === '' || formData.content === '') {
        return;
      }
    } else if (user.userType === 'staff' && props.materials) {
      endPoint = 'http://localhost:5000/staff/addMaterial';
      if (formData.title === '' || formData.content === '') {
        return;
      }
    }

    if (links.length !== 0) {
      links.forEach((item) => {
        formData.content = `${formData.content} <a>${item}<a/>`;
      });
    }

    obj.module_id = user.module_id;
    obj.semester = parseInt(obj.semester);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    await sendRequest(endPoint, 'POST', obj, config);
    setFormData({
      title: '',
      content: '',
      deadline: '',
      semester: '',
    });
    setLinks([]);
    setLinkText('');
    setLinkActive(false);
  };

  return (
    <div className="assignment-create-box">
      <div className="create-assignment-label">Create New +</div>

      <div className="assignment-form">
        <div className="assignment-detail">

          <form onSubmit={(e) => { e.preventDefault(); }}>

            <input
              className="assignment-heading"
              type="text"
              name=""
              id=""
              placeholder="Heading..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <textarea
              className="assignment-body"
              name="assignment-content"
              id=""
              cols="30"
              rows="10"
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />

            <div className="options-box">

              <h4 className="heading">Brief Links</h4>

              {links.map((item) => (
                <LinkComponent
                  link={item}
                  key={item}
                  removeLink={removeLink}
                />
              ))}

              {linkActive ? (
                <input className="linkInput" value={linkText} type="text" placeholder="Add link.." onChange={(e) => { setLinkText(e.target.value); }} />
              ) : null}

              <button type="button" onClick={linkHandler}>{linkActive ? 'Post Link' : 'Add new'}</button>

              {user.userType === 'staff' && props.assignment ? (
                <>
                  <div className="date-level-selector">
                    <label>Due Date</label>
                    <input type="datetime-local" id="end-date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} />
                  </div>
                  <div className="module-selector">
                    <label htmlFor="modules">Select Level</label>

                    <select
                      name="modules"
                      id="modules-selector"
                      onChange={(e) => {
                        setFormData({ ...formData, semester: e.target.value });
                      }}
                    >
                      <option key={1} value="1">1</option>
                      <option key={2} value="2">2</option>
                      <option key={3} value="3">3</option>
                      <option key={4} value="4">4</option>
                      <option key={5} value="5">5</option>
                      <option key={6} value="6">6</option>
                    </select>
                  </div>
                </>
              ) : null}
            </div>

            <button className="save-assignment-btn" type="submit" onClick={addAssignment}>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function LinkComponent(props) {
  return (
    <div className="link">
      <a
        href={props.link}
      >
        {props.link}
      </a>
      <button type="button" onClick={() => { props.removeLink(props.link); }}>Remove</button>
    </div>
  );
}
