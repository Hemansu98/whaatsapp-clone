import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';

import '../scss/Form.scss';

import { loginRoute } from './../utils/APIRoutes';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    if(!formData.password || !formData.username) {
      setToast({
        ...toast,
        show: true,
        msg: `Please submit valid email and password!`,
      });
      return false;
    }
    return true;
  }
  const handleSubmit = async function(e) {
    e.preventDefault();
    if(validateData()) {
      let payload = { ...formData };
      const { data } = await axios.post(loginRoute, payload);
      localStorage.setItem('chatter-box-user', JSON.stringify(data.user));
      localStorage.setItem('chatter-box-token', data.token);
      navigate('/');
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
        <h3 className="form__title">Login</h3>
        <input
          type="text"
          value={formData.username}
          placeholder="Enter Username"
          name="username"
          onChange={(e) => updateFormData(e, 'username')}
          />
        <input
          type="password"
          value={formData.password}
          placeholder="Enter Password"
          name="password"
          onChange={(e) => updateFormData(e, 'password')}
          />
        <button type="submit">Login</button>
        <div className="switch_to_login">Don't have an account? <Link to="/register">Register</Link></div>
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

export default Login;