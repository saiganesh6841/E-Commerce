

import React, { useContext, useState } from 'react';
import './styles.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { searchQueryContext } from '../../navigationStack/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseURL } from '../../App';
// import './styles.css'; // Assuming your CSS file is named styles.css

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { handleLogin } = useContext(searchQueryContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (isLogin) {
      try {
        // Call login API with email and password
        const response = await axios.post(`${baseURL}/login`, {
          email,
          password,
        });
        localStorage.setItem('TOKEN', response.data.token);
        console.log(response.data.token);
        toast.success(response.data.message);
        handleLogin();
        navigate('/');
      } catch (error) {
        // Handle login error
        console.log('Login Error:', error.response.data);
        toast.error(error.response?.data?.message);
      }
    } else {
      try {
        // Call register API with email, password, and username
        const response = await axios.post(`${baseURL}/register`, {
          email,
          password,
          username,
        });
        toast.success(response.data.message);
        console.log('Signup:', response.data);
      } catch (error) {
        // Handle registration error
        console.log('Registration Error:', error.response.data);
        toast.error(error.response.data.error);
      }
    }

    // // Reset input fields
    // setEmail('');
    // setPassword('');
    // setUsername('');
  };

  const handleToggle = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="wrapper">
    <div className="title-text">
      <div className={`title ${isLogin ? 'login' : 'signup'}`}>{isLogin ? 'Login Form' : 'Signup Form'}</div>
    </div>
    <div className="form-container">
      <div className="slide-controls">
        <input type="radio" name="slide" id="login" checked={isLogin} onChange={handleToggle} />
        <input type="radio" name="slide" id="signup" checked={!isLogin} onChange={handleToggle} />
        <label htmlFor="login" className={`slide login ${isLogin ? 'active' : ''}`}>Login</label>
        <label htmlFor="signup" className={`slide signup ${!isLogin ? 'active' : ''}`}>Signup</label>
        <div className="slider-tab"></div>
      </div>
      <div className="form-inner">
        <form onSubmit={handleSubmit} className={isLogin ? 'login' : 'signup'}>
          <div className="field">
            <input type="text" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {!isLogin && (
            <div className="field">
              <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          )}
          <div className="field btn">
            <div className="btn-layer"></div>
            <input type="submit" value={isLogin ? 'Login' : 'Signup'} />
          </div>
          <div className="pass-link"><a href="#">Forgot password?</a></div>
        </form>
      </div>
    </div>
    {/* <ToastContainer/> */}
  </div>
  );
};

export default AuthForm;
