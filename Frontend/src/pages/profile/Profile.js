import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice'
import { getUser } from '../../services/authService'
import "./Profile.scss"
import { SpinnerImg } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { Link } from 'react-router-dom'

const Profile = () => {
    useRedirectLoggedOutUser("/login")
    const dispatch = useDispatch()
    const [profile, setProfile] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    
    useEffect(() => {
         setIsloading(true)
         async function getUserData() {
             const data = await getUser()
             console.log(data);

             setProfile(data)
             setIsloading(false)
             dispatch(SET_USER(data))
             dispatch(SET_NAME(data.name))
         }
         getUserData()
    }, [dispatch])

  return (
    <div className='profile --my2'>
        {isLoading && <SpinnerImg />}
        <>
           {!isLoading && profile === null ? (
              <p>Something went wrong, please reload the page...</p>
           ) : (
               <Card cardClass={"card --flex-dir-column "}>
                    <span className='profile-photo'>
                        <img src={profile?.photo} alt="profilepic"/>
                    </span>
                    <span className='profile-data'>
                       <p>
                          <b>Name - </b> {profile?.name}
                       </p>
                       <p>
                          <b>Email - </b> {profile?.email}
                       </p>
                       <p>
                          <b>Phone - </b> {profile?.phone}
                       </p>
                       <p>
                          <b>Bio - </b> {profile?.bio}
                       </p>

                       <div>
                           <Link to="/ edit-profile">
                              <button className='--btn --btn-primary'>Edit Profile</button>
                           </Link>
                       </div>

                    </span>
               </Card> 
           )}
        </>
    </div>
  )
}
 
export default Profile