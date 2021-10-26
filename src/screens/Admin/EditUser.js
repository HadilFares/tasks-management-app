import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Checkbox } from "react-bootstrap";
import moment from "moment";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [admin,setAdmin] = useState(false);
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    dateDemarrage: "",
    isAdmin: admin,
  });
  const { name, lastname, dateDemarrage, isAdmin } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/update/${id}`, user);
    history.push("/users");
  };
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3000/user/get/${id}`);
    console.log(user.data);
    setUser(result.data);
    setAdmin(result.data.isAdmin)
  };

  const handleChange = e => {
    setAdmin(!admin);
    setUser({ ...user, [e.target.name]: e.target.value });
 };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Your date"
              name="dateDemarrage"
              //value={dateDemarrage}
              value={moment(dateDemarrage).format("yyyy-MM-DD")}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div>
            <input type="checkbox" id="isAdmin" checked={admin} onClick={handleChange} />

            <label for="isAdmin">Is Admin </label>
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
