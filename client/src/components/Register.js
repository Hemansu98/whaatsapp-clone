import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';

import '../scss/Form.scss';
import { registerRoute } from './../utils/APIRoutes';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [toast, setToast] = useState({
    show: false,
    msg: ''
  });

  const navigate = useNavigate();
  useEffect(function() {
    if(localStorage.getItem('chatter-box-user')) {
      navigate('/');
    }
  }, []);

  const validateData = function() {
    if(formData.password != formData.confirmPassword) {
      setToast({
        ...toast,
        show: true,
        msg: `Passwords didn't match`,
      });
      return false;
    }
    if(formData.password.length < 6) {
      setToast({
        ...toast,
        show: true,
        msg: 'Password should be atleast 6 characters long',
      });
      return false;
    }
    return true;
  }

  const handleSubmit = async function(e) {
    e.preventDefault();
    if(validateData()) {
      try {
        let { username, email, password } = formData;
        let payload = {};
        payload['username'] = username;
        payload['email'] = email;
        payload['password'] = password;
        const { data } = await  axios.post(registerRoute, payload);
        localStorage.setItem('chatter-box-user', JSON.stringify(data.user));
        localStorage.setItem('chatter-box-token', data.token);
        navigate('/setAvatar');
      }
      catch(e) {
        /*****  Handle Error Here *****/
        /* Use toast to show error occured */
        setToast({
          ...toast,
          show: true,
          msg: 'Internal Server Error. Please try again.!',
        });
      }
    }
  }

  const updateFormData = function(e, property) {
    setFormData({
      ...formData,
      [property]: e.target.value,
    });
  }

  return (
    <div className="form__container">
      <form onSubmit={handleSubmit} autoComplete="off">
        <h3 className="form__title">Register</h3>
        <input
          type="text"
          value={formData.username}
          placeholder="Enter Username"
          name="username"
          onChange={(e) => updateFormData(e, 'username')}
          />
        <input
          type="email"
          value={formData.email}
          placeholder="Enter Email"
          name="email"
          onChange={(e) => updateFormData(e, 'email')}
        />
        <input
          type="password"
          value={formData.password}
          placeholder="Enter Password"
          name="password"
          onChange={(e) => updateFormData(e, 'password')}
          />
        <input
          type="password"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => updateFormData(e, 'confirmPassword')}
        />
        <button type="submit">Register User</button>
        <div className="switch_to_login">Already have an account? <Link to="/login">Login</Link></div>
      </form>
      <ToastContainer position="bottom-end" >
        <Toast 
          onClose={() => setToast({...toast, show: false})} 
          show={toast.show} 
          delay={2000}
        
          autohide>
            <Toast.Header>
              <strong className="me-auto" style={{color: 'red', fontSize: '16px'}}>Error</strong>
            </Toast.Header>
            <Toast.Body className="toast-body">{toast.msg}</Toast.Body>
          </Toast>
        </ToastContainer>
    </div>
  )
}

export default Register;