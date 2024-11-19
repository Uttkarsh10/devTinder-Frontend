import React, { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { adduser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
    const [photoURL, setPhotoURL] = useState(user.photoURL);
    
    const [error, setError] = useState("");
    const dispatch = useDispatch();
  
    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, about, photoURL }, { withCredentials: true });
            dispatch(adduser(res.Data.data));
        } catch (error) {
            setError(error.message);
        }
    }

  return (
      <div className="flex justify-center my-10">
          
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl h-full">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Photo URL</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </label>

            <div className="card-actions justify-center m-2">
              <button className="btn btn-primary" onClick={saveProfile}>Save Data</button>
            </div>
          </div>
        </div>
          </div>
          
        <UserCard user={{firstName, lastName, age, gender, about, photoURL}} />
    </div>
  );
};

export default EditProfile;