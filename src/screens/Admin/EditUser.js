import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Checkbox } from "react-bootstrap";
import moment from "moment";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [isAdmin, setIsAdmin] = useState();
  const [name, setName] = useState();
  const [lastname, setLastName] = useState();
  const [dateDemarrage, setDateDemarrage] = useState();

  

  useEffect(() => {
    loadUser();
   
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/update/${id}`, {
      name,
      lastname,
      dateDemarrage,
      isAdmin,
    });
    history.push("/users");
  };
  const loadUser = async () => {
    await axios.get(`http://localhost:3000/user/get/${id}`).then((result) => {
     // console.log(result.data);
      setIsAdmin(result.data.isAdmin);
      setLastName(result.data.lastname);
      setName(result.data.name);
      setDateDemarrage(result.data.dateDemarrage);
    });
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
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter Your date"
              name="dateDemarrage"
              value={moment(dateDemarrage).format("yyyy-MM-DD")}
              onChange={(e) => setDateDemarrage(e.target.value)}
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />

            <label for="isAdmin">Is Admin </label>
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
