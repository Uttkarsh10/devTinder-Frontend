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

  const [message, setMessage] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoURL },
        { withCredentials: true }
      );
      // console.log(res.data.Data);
      dispatch(adduser(res.data.Data));
      setTimeout(() => {
        setMessage(false)
      }, 4000);

      setMessage(true);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-5">
        <div className="flex justify-center mx-10 h-5/6">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              <label className="form-control w-full max-w-xs">
                <span className="label-text p-1.5 text-xs">First Name</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs h-10"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <span className="label-text p-1.5 text-xs">Last Name</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs h-10"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <span className="label-text p-1.5 text-xs">Age</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs h-10"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <span className="label-text p-1.5 text-xs">Gender</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs h-10"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <span className="label-text p-1.5 text-xs">About</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs h-10"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <span className="label-text p-1.5 text-xs">Photo URL</span>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs h-10"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </label>

              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Data
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{ firstName, lastName, age, gender, about, photoURL }}
        />
      </div>

      {message && <div className="toast toast-top toast-center">
        <div className="alert alert-info">
          <span>Profile Updated.</span>
        </div>
      </div>}
    </>
  );
};

export default EditProfile;
