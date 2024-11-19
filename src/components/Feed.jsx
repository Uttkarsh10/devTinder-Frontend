import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from './userCard';


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  
  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      // console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return feed && (
    <div className='flex justify-center my-3'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed