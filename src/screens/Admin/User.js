import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    //id:"",
    matricule: "",
    name: "",
    lastname: "",
    dateDemarrage: ""
    
  });
  /*
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3000/user/get/${id}`);
    setUser(res.data);
  };*/
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>

      <hr />
      <ul className="list-group w-50">
        
        
        <li className="list-group-item">matricule: {user.matricule}</li>
        <li className="list-group-item">name: {user.name}</li>
        <li className="list-group-item">lastname: {user.lastname}</li>
        <li className="list-group-item">DateDemarrage: {user.dateDemarrage}</li>
        
      </ul>
    </div>
  );
};

export default User;