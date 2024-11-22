import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
    

  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="text-bold text-2xl">No Connection Found.</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoURL } =
          connection;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 bg-base-300 rounded-3xl w-2/3 mx-auto"
          >
            <div>
              <img src={photoURL} className="w-40 h-40 rounded-full" />
            </div>
            <div className="m-4 p-4 text-left">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              <p>{about}</p>
              {age && gender && (<p>{age}, {gender}</p>)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
