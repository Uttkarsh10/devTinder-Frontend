import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, skills, photoURL, age, gender } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl h-2/3">
      <figure>
        <img src={photoURL} alt="User Imagw" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {age && gender && <p>{age + "," + gender}</p>}

        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Interested</button>
          <button className="btn btn-secondary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
