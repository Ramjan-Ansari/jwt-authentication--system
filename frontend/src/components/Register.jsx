import React, { useState } from 'react'
import styles from '../style/auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")

        try {
            const response = await axios.post('http://localhost:4000/api/user/register', {name, email, password, mobile})
            console.log(response);
            
            setname("");
            setEmail("");
            setMobile("");
            setPassword("");

            navigate('/login');

        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    }

  return (
    <div>
            <div className={styles.authContainer}>
                <form action="" className={styles.authForm} onSubmit={handleSubmit}>
                    <h2 className={styles.authTitle}>Create An Account</h2>
                    <label htmlFor="">Full Name</label>
                    <input type="text" value={name} onChange={(e)=> setname(e.target.value)} required/>

                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="" id="" required/>

                    <label htmlFor="">Phone No.</label>
                    <input value={mobile} onChange={(e)=>setMobile(e.target.value)} type="number" required />

                    <label htmlFor="">Set Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='' />

                    {
                        error &&
                        <p className={styles.authError}>{error}</p>
                    }
    
                    <button className={styles.btn} type="submit">Register</button>
    
                    <p>Already have an Account?<Link to={'/login'}>Login</Link></p>
                </form>
            </div>
        </div>
  )
}

export default Register