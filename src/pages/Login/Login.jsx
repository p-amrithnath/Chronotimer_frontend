import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../../services/SecurityService';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginService.login(username, password);
      console.log('Login successful:', response);
      localStorage.setItem('jwtToken', response.token);
      localStorage.setItem('userId', response.userId);
      const employee = await LoginService.getEmployeeById(response.userId);
      console.log('Employee :',employee);
      localStorage.setItem('name',employee.name);
      localStorage.setItem('role',employee.roles);
      navigate('/home', { state: { employee } });
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <div className="container my-3 py-3">
      <h1 className="navbar-brand fw-bold fs-4 px-2" >
          <i className="fa fa-clock mr-2"></i>Chronotimer
        </h1>
      <h1 className="text-center">Login</h1>
      <hr />
      <div className="row my-4 h-100">
        <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="floatingInput">Username</label>
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label htmlFor="floatingPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button className="my-2 mx-auto btn btn-dark" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;