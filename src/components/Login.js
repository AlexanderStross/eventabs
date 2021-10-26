import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
//import history from './../history'

function Login(props){
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleLogin = useCallback(
    event => {
      event.preventDefault();
      setEmail(event.target.elements.email.value)
      setPassword(event.target.elements.password.value)
    },
    [setEmail,setPassword]
  );

    useEffect((e) => {
         if (email && password) {
           axios({
             method: 'POST',
             url: 'http://localhost:3001/auth/sign_in',
             data: {
               email: email,
               password: password
             }
           })
           .then((response) => {
             console.log(response)
             setError(undefined);
             localStorage.setItem('user',
             JSON.stringify({
               'access-token': response.headers['access-token'],
               'client': response.headers['client'],
               'uid': response.data.data.uid
             }))
             window.location = '/'
           })
      .catch(error => {
        console.log(error)
        setEmail();
        setPassword();
        setError(error);
        })
      }
    }, [error,email,password])


    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={handleLogin} >
          <input name="email" />
          <input name="password" type="password"  />
          <input type="submit" value="Log in" />
        </form>
      </div>
    )
}

export default Login
