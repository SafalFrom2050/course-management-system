/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './AddModule.css';
import { React, useState, useContext } from 'react';
import { useAlertBoxShowMsg } from '../../../contexts/AlertBoxContext';

import { AuthContext } from '../../../contexts/AuthContext';
import { useHttpClient } from '../../../hooks/http-hook';

export default function AddMoudle() {
  const [module, setModule] = useState({
    module_name: '',
    module_id: '',
    course_id: '101',
    module_level: '1',
    module_credit: '',
    ass_1: '',
    ass_2: '',
    exam: '',
  });
  const showAlertBox = useAlertBoxShowMsg();
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let sum = 0;
    let error = false;
    const array = Object.values(module);

    array.forEach((element, index) => {
      if (element.trim().length === 0 && index < 5) {
        showAlertBox('Do not leave any fields empty', 2000);
        error = true;
      }
      if (index === 4 && typeof parseInt(element) !== 'number' && !error) {
        showAlertBox('Module credit should be a number.', 2000);
        error = true;
      }
      if (index >= 5 && element.trim().length !== 0) {
        sum += parseInt(element);
      }
    });
    if (error) {
      return;
    }
    if (sum !== Number && sum !== 100) {
      showAlertBox('Assignment/Exam weightage should total to 100', 2000);
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    };

    const result = await sendRequest('http://localhost:5000/admin/createModule', 'POST', module, config).catch((err) => {
      showAlertBox('Network error! Please try again later...', 2000);
    });
    if (!result) {
      showAlertBox('Error while adding module. Try again with new dataset.', 2000);
      return;
    }
    showAlertBox('Module added', 2000);
  };

  return (
    <>
      <div className="module-submit-box">
        <div className="submit-module-label">Add Module</div>
        <div className="module-form">
          <div className="module-detail">
            <form onSubmit={formSubmitHandler}>
              <input
                className="module-heading"
                type="text"
                name=""
                id=""
                placeholder="Title"
                onChange={(e) => {
                  setModule({ ...module, module_name: e.target.value });
                }}
                value={module.module_name}
              />

              <div className="options-box">

                <input
                  placeholder="Module Id"
                  onChange={(e) => {
                    setModule({ ...module, module_id: e.target.value });
                  }}
                  value={module.module_id}
                />

                <div className="module-selector">
                  <label htmlFor="modules">Select Course</label>

                  <select
                    name="modules"
                    id="modules-selector"
                    onChange={(e) => {
                      setModule({ ...module, course_id: e.target.value });
                    }}
                  >
                    <option value="module-1">101</option>
                    <option value="module-2">102</option>
                    <option value="module-3">103</option>

                  </select>
                </div>

                <div className="module-selector">
                  <label htmlFor="modules">Select Level</label>

                  <select
                    name="modules"
                    id="modules-selector"
                    onChange={(e) => {
                      setModule({ ...module, module_level: e.target.value });
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <input
                  placeholder="module credit (%)"
                  onChange={(e) => {
                    setModule({ ...module, module_credit: e.target.value });
                  }}
                  value={module.module_credit}
                />

                <input
                  placeholder="assignment 1 weightage(%)"
                  onChange={(e) => {
                    setModule({ ...module, ass_1: e.target.value });
                  }}
                  value={module.ass_1}
                />

                <input
                  placeholder="assignment 2 weightage(%)"
                  onChange={(e) => {
                    setModule({ ...module, ass_2: e.target.value });
                  }}
                  value={module.ass_2}
                />

                <input
                  placeholder="exam weightage(%)"
                  onChange={(e) => {
                    setModule({ ...module, exam: e.target.value });
                  }}
                  value={module.exam}
                />

                <button className="save-module-btn" type="submit">Submit</button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
