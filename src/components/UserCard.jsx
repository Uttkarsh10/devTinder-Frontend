import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, skills, photoURL, age, gender } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId))
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (

    <div className="card bg-base-300 w-96 shadow-xl h-5/6 flex flex-col">
      <figure className="flex-shrink-0">
        <img
          src={photoURL}
          alt="User Image"
          className="w-full object-cover h-96"
        />
      </figure>
      <div className="card-body flex-grow">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p className="p-0 text-sm">{about}</p>
        {age && gender && <p className="p-0 text-sm">{`${age}, ${gender}`}</p>}
        <div className="card-actions justify-center mt-auto">
          <button className="btn btn-primary" onClick={() => handleSendRequest("Interested", _id)}>Interested</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("Ignored", _id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
