import React, { useState } from 'react'
import styles from '../style/auth.module.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'



const Login = () => {

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e)=> {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:4000/api/user/login', {email, password}, {
      withCredentials : true,
    })

    if(response.status === 200){
      setEmail("")
      // alert("login successfull");
      console.log(response);
      const {accessToken} = response.data;
      console.log(accessToken);
      if(accessToken){
        localStorage.setItem("accessToken", accessToken);
      }else{
        console.log("Token Not Recevied")
      }
      navigate('/getuserdetails');
    }
    } catch (error) {
      console.log("login Error", error);
       setError(error.response.data.message);
    }
    
  }




  return (
    <div>
        <div className={styles.authContainer}>
            <form action="" className={styles.authForm} onSubmit={handleSubmit}>
                <h2 className={styles.authTitle}>Create An Account</h2>
                
                <label htmlFor="">Email</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" name="" id="" required/>
                
                <label htmlFor="">Set Password</label>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder='' />
                
                {
                  error && 
                  <p className={styles.authError}> {error} </p>
                }

                <button className={styles.btn} type="submit">Login</button>

                <p>Already have an Account?<Link to={'/register'}>Register</Link></p>
            </form>
        </div>
    </div>
  )
  
}

export default Login