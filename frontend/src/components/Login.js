import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Login.scss";


// Rest of your component code...



const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


// Change 'const' to 'let' here
let handleSubmit = async (e) => {
  e.preventDefault();

  // Use 'setEmail' and 'setPassword' to update the state variables
  // setEmail('user@example.com');
  // setPassword('password');

  try {
    const setCookie = (name, value, days) => {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    };

    const response = await axios.post('http://localhost:5000/login', { email, password });
    setCookie('jwt', 'Bearer ' + response.data.token);

    if (response.status === 200) {
      const token = response.data.token;
      console.log('Token:', token);

      localStorage.setItem('accessToken', token);

      navigate('/allBooks');
    } else {
      console.log('Login failed:', response.data.message);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // login authentication
  //   const request = new XMLHttpRequest();
  //   request.open('POST', 'http://localhost:5000/login');
  //   request.setRequestHeader('Content-Type', 'application/json');

  //   request.onload = () => {
  //     if (request.status === 200) {
  //       const response = JSON.parse(request.responseText);

  //       // Set the cookie
  //       const setCookie = (name, value, days) => {
  //         const date = new Date();
  //         date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  //         const expires = "expires=" + date.toUTCString();
  //         document.cookie = name + "=" + value + ";" + expires + ";path=/";
  //       };

  //       setCookie('jwt', 'Bearer ' + response.token);

  //       // Set the accessToken in localStorage
  //       const token = response.token;
  //       console.log('Token:', token);

  //       localStorage.setItem('accessToken', token);

  //       // Redirect to '/allBooks'
  //      navigate = '/allBooks';
  //     } else {
  //       console.log('Login failed:', request.responseText);
  //     }
  //   };

  //   request.send(JSON.stringify({ email, password }));
  // };



  return (
    <div className="login-form">
      <h3 className="text-center">Login</h3>
      <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group controlId="formUsername">
              <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
          </Form.Group>

          <Form.Group controlId="formPassword" className='mt-3'>
              <Form.Control 
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3 button">
              Login
          </Button> 
      </Form>
    </div>
    );
};

export default Login;


