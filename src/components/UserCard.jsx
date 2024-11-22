import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, skills, photoURL, age, gender } = user;
  return (
    // <div className="card bg-base-300 w-96 shadow-xl h-5/6">
    //   <figure>
    //     <img src={photoURL} alt="User Image"/>
    //   </figure>
    //   <div className="card-body">
    //     <h2 className="card-title">{firstName + " " + lastName}</h2>
    //     <p className="p-0">{about}</p>
    //     {age && gender && <p className="p-0">{age + "," + gender}</p>}
    //     <div className="card-actions justify-center my-4">
    //       <button className="btn btn-primary">Interested</button>
    //       <button className="btn btn-secondary">Ignore</button>
    //     </div>
    //   </div>
    // </div>

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
          <button className="btn btn-primary">Interested</button>
          <button className="btn btn-secondary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
