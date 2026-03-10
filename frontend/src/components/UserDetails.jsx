import React, { useState, useEffect } from "react";
import styles from "../style/auth.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {

    try {

      const response = await axios.get(
        "http://localhost:4000/api/user/getuserdetails",
        {
          withCredentials: true
        }
      );

      console.log(response.data);

      setUser(response.data);

    } catch (error) {

      console.log(error);

      if (error.response?.status === 401) {
        navigate("/login");
      }

    }
  };


  const handleLogout = async () => {

    try {

      await axios.post(
        "http://localhost:4000/api/user/logout",
        {},
        { withCredentials: true }
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

    }
  };


  return (

    <div className={styles.Container}>

      <div className={styles.details}>

        <h2 className={styles.authTitle}>User Details</h2>

        <p style={{ margin: "10px 0" }}>
          Name : {user?.name}
        </p>

        <p style={{ margin: "10px 0" }}>
          Email : {user?.email}
        </p>

        <p>
          Phone : {user?.mobile}
        </p>

        <button className={styles.btn} onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>

  );
};

export default UserDetails;