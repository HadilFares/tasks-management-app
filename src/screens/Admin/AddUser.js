import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";

const AddUser = () => {
  const [userList, setuserList] = useState([]);
  const [isMailSend, setIsMailSend] = useState(false);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    dateDemarrage: "",
    email: "",
  });

  const { name, lastname, dateDemarrage, email } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await axios.get("http://localhost:3000/read");
    console.log(result.data.reverse());
    setuserList(result.data.reverse());

    /* var found = false;
    for (var i = 0; i < result.data.length; i++) {
      if (result.data[i].matricule == user.matricule) {
        found = true;
        break;
      }
    }

   if (found == true) {
      return alert("matricule already exit");
    } else {*/
    try {
      await axios.post("http://localhost:3000/create", user).then((res) => {
        setLoading(false);
        let result = axios.post("http://localhost:3000/api/sendmail", {
          user: user,
          id: res,
        });
        console.log(result);
        setIsMailSend(true);
        console.log("user added sucessfuly");
      });
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
          {isMailSend && <Alert variant="success">Mail send successfuly</Alert>}
        <h2 className="text-center mb-4">Add A User</h2>
        <form onSubmit={(e) => onSubmit(e)}>

          <div className="form-group">
            Email :
            <input
              type="text"
              className="form-control form-control-lg"
              required="First name is required."
              name="email"
              value={email}
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
          {loading ? (
            <button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </button>
          ) : (
            <button className="btn btn-primary btn-block">Add User</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddUser;
