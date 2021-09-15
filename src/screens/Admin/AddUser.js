import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddUser = () => {
  const [userList, setuserList] = useState([]);

  let history = useHistory();
  const [user, setUser] = useState({
    matricule: "",
    name: "",
    lastname: "",
    dateDemarrage: "",
  });

  const { matricule, name, lastname, dateDemarrage } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.get("http://localhost:3000/read");
    console.log(result.data.reverse());
    setuserList(result.data.reverse());

    var found = false;
    for (var i = 0; i < result.data.length; i++) {
      if (result.data[i].matricule == user.matricule) {
        found = true;
        break;
      }
    }
    if (found == true) {
      return alert("matricule already exit");
    } else {
      await axios.post("http://localhost:3000/create", user);
      history.push("/");
    }
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            matricule:
            <input
              type="text"
              className="form-control form-control-lg"
              required="matricule is required."
              name="matricule"
              value={matricule}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            Name :
            <input
              type="text"
              className="form-control form-control-lg"
              required="First name is required."
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            LastName:
            <input
              type="text"
              className="form-control form-control-lg"
              required="lastname is required."
              name="lastname"
              value={lastname}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            DateDemarrage :
            <input
              type="date"
              className="form-control form-control-lg"
              required="date is required."
              name="dateDemarrage"
              value={dateDemarrage}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
