import React, { useState } from 'react'
import styles from "./auth.module.scss"
import { MdPassword } from "react-icons/md"
import Card from "../../components/card/Card"
import {Link, useParams} from "react-router-dom"
import { resetPassword } from '../../services/authService'
import { toast } from 'react-toastify'

const initialState = {
  password: "",
  password2: "",
}


const Reset = () => {

  const [formData, setFormData] = useState(initialState);
  const {password, password2} = formData;

  const {resetToken} = useParams()

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();
    //console.log(formData);
    //console.log(resetToken);

    if(password.length < 6) {
      return toast.error("Password must not be upto 6 characters");;
    }

    if(password !== password2) {
      return toast.error("Password do not match");;
    }

    const userData = {
      password,
      password2,
    };
  
    try {
       const data = await resetPassword(userData, resetToken)
       toast.success(data.message)
    } catch(error) {
       console.log(error.message)
    }


  };
  
  

  return (

    <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <div className='--flex-center'>
                     <MdPassword size={35} color="#999"/>
                </div>
                <h2>Reset Password</h2>

                <form onSubmit={reset}>
                  <input type="password" placeholder='New Password' name='password' required value={password} onChange={handleInputChange}/>
                  <input type="password" placeholder='Confirm New Password' name='password2' required value={password2} onChange={handleInputChange}/>
                  <button type="submit" className='--btn --btn-primary --btn-block'>Reset Password</button>
                
                  <div className={styles.links}>
                    <p>
                       <Link to="/">- Home</Link>
                    </p>
                       <Link to="/login">- Login</Link>
                  </div>
                </form>

               
            </div>
        </Card>
    </div>
  )
}

export default Reset;