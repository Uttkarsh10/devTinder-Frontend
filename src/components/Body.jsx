import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { adduser } from '../utils/userSlice'

const Body = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProfile = async () => {
    if (user) return;

    try {
      const res = await axios.get(BASE_URL + "/profile", {withCredentials: true});
      dispatch(adduser(res.data));
      
    }
    catch (error) {
      if (error.status === 401) {
        navigate("/login");
      } 
      console.log(error);
    }
  } 

  useEffect(() => {
    getProfile();
  }, []);

  return (
      <div>
          <Navbar />
          <Outlet />
          <Footer/>
    </div>
  )
}

export default Body