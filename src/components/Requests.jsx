import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.request);

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/recieved", { withCredentials: true });
            dispatch(addRequests(res.data.data));
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        fetchRequest()
    }, [])

    const reviewRequest = async(status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
        } catch (error) {
            console.log(error.response.data);
        }
  }


    if (!requests) return;
    if (requests.length === 0) return <h1 className="text-bold text-2xl text-center p-4 m-4">No Connection Found.</h1>;
      
    return (
      <div className="text-center my-10">
        <h1 className="text-bold text-3xl">Requests</h1>
  
        {requests.map((request) => {
            const { _id, firstName, lastName, age, gender, about, photoURL } =
                request.senderUserID;
  
          return (
            <div key={_id} className="flex m-4 p-4 bg-base-300 rounded-3xl w-1/2 mx-auto">
              <div>
                <img src={photoURL} className="w-40 h-40 rounded-full" />
              </div>
              <div className="m-4 p-4 text-left">
                <h2 className="font-bold">{firstName + " " + lastName}</h2>
                <p>{about}</p>
                {age && gender && (<p>{age}, {gender}</p>)}
                  </div>
                <div>
                <button className="btn btn-primary mx-2" onClick={() => reviewRequest("Rejected", _id)}>Reject</button>
                <button className="btn btn-primary mx-2"onClick={() => reviewRequest("Accepted", _id)}>Accept</button>
              </div>
                  
                
            </div>
          );
        })}
      </div>
    );
}

export default Requests