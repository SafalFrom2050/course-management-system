/* eslint-disable import/prefer-default-export */
import {
  useState, useRef, useEffect, useCallback,
} from 'react';

export const useAuth = () => {
  const token = useRef('');
  const [userName, setUsername] = useState('');
  const [userType, setUserType] = useState('');

  const login = useCallback((recievedData) => {
    token.current = recievedData.token;
    setUsername(recievedData.name);
    let obj = {
      token: recievedData.token,
      name: recievedData.name,
    };
    if (recievedData.userType === 'staff') {
      obj.staff_id = recievedData.staff_id;
      obj.module_id = recievedData.module_id;
      obj.userType = 'staff';
      setUserType('staff');
    } else if (recievedData.userType === 'student') {
      obj.student_id = recievedData.student_id;
      obj.userType = 'student';
      obj.gender = recievedData.gender;
      setUserType('student');
    } else {
      obj.admin_id = recievedData.admin_id;
      obj.userType = 'admin';
      setUserType('admin');
    }
    obj = JSON.stringify(obj);
    localStorage.setItem('userData', obj);
  }, []);

  const logout = useCallback(() => {
    token.current = '';
    setUsername('');
    setUserType('');
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      const recievedData = {
        token: storedData.token,
        name: storedData.name,
      };
      if (storedData.userType === 'staff') {
        recievedData.staff_id = storedData.staff_id;
        recievedData.module_id = storedData.module_id;
        recievedData.userType = 'staff';
      } else if (recievedData.userType === 'student') {
        recievedData.student_id = storedData.student_id;
        recievedData.userType = 'student';
        recievedData.gender = storedData.gender;
      } else {
        recievedData.admin_id = storedData.admin_id;
        recievedData.userType = 'admin';
      }
      login(recievedData);
    }
  }, [login]);

  return {
    token, userName, userType, login, logout,
  };
};
