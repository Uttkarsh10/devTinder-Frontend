import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adduser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isloginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loginHandler = async () => {

    try {
      const res = await axios.post( BASE_URL + "/login", {
        email,
        password
      }, { withCredentials: true }
      );

      dispatch(adduser(res.data));
      navigate("/")

    } catch (error) {
      setErrMessage(error.response.data);
    }
  }

  const signUpHandler = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        email,
        password
      }, { withCredentials: true }
      );

      dispatch(adduser(res.data.data));
      navigate("/profile"); 

    } catch (error) {
      setErrMessage(error.response.data);
    }
  }

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{!isloginForm ? "Login" : "SignUp"}</h2>


          {isloginForm &&
            <>
              <label className="input input-bordered flex items-center gap-2 m-2">
                <input type="text" className="grow" placeholder="FirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </label>

              <label className="input input-bordered flex items-center gap-2 m-2">
                <input type="text" className="grow" placeholder="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              </label>
          </>}

          <label className="input input-bordered flex items-center gap-2 m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>

          <label className="input input-bordered flex items-center gap-2 m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="password" className="grow" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          <p className="text-red-500 flex justify-center">{errMessage}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={!isloginForm ? loginHandler:signUpHandler}>{!isloginForm ? "Login" : "SignUp"}</button>
          </div>

          <p className="m-auto cursor-pointer py-2" onClick={() => { setIsLoginForm(!isloginForm) }}>
            {!isloginForm ? "New User? Sign Up" : "Existing User? Log In"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
