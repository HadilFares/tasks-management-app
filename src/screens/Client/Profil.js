import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

function Profil() {
  let history = useHistory();
  const id = localStorage.getItem("id");
  const [name, setName] = useState();
  const [lastname, setLastName] = useState();
  const [password, setPassword] = useState();
  const [verifPassword, setVerifPassword] = useState();
  const [error, setError] = useState(false);

  const onUpdateProfile = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/update/${id}`, {
      name,
      lastname,
    });
    history.push("/dashboard");
  };

  const onUpdatePassword = async (e) => {
    e.preventDefault();
    if (password != verifPassword) setError("Invalid password verfication");
    else {
      try {
        await axios.put(`http://localhost:3000/update/${id}`, { password });
        history.push("/dashboard");
      } catch (error) {}
    }
  };

  const loadUser = async () => {
    await axios.get(`http://localhost:3000/user/get/${id}`).then((result) => {
      setName(result.data.name);
      setLastName(result.data.lastname);
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          {error == false && <Alert variant={"danger"}>Invalid password</Alert>}
          <h2 className="text-center mb-4">Edit My Profil</h2>
          <form onSubmit={(e) => onUpdateProfile(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter New name"
                name="name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter New lastname"
                name="lastname"
                defaultValue={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <button className="btn btn-warning btn-block">
              Update Profile
            </button>
          </form>
        </div>
      </div>

      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Edit password</h2>
          <form onSubmit={(e) => onUpdatePassword(e)}>
            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter New Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Confirm Password"
                name="password"
                onChange={(e) => setVerifPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-warning btn-block">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profil;
