import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";

function User({ users, loading }) {
  console.log(users);
  console.log(loading);
  //const [userList, setuserList] = useState(Users);

  /*const loadUsers = async () => {
    const result = await axios.get("http://localhost:3000/read");
    setuserList(result.data.reverse());
  };*/
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/delete/${id}`);
    //loadUsers();
  };
  return (
    <table id="tblData" className="table border shadow">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>

          <th scope="col">Name</th>
          <th scope="col">LastName</th>
          <th scope="col">hiring date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <h1>loading...</h1>
        ) : (
          users.map((user, id) => (
            <tr key={id}>
              <th scope="row"></th>

              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>
                {
                  (user.dateDemarrage = moment(user?.dateDemarrage).format(
                    "YYYY / MM / DD"
                  ))
                }
              </td>
              <td>
                <Link
                  className="btn btn-outline-primary mr-2"
                  to={`/users/edit/${user._id}`}
                >
                  Edit
                </Link>
                <Link
                  className="btn btn-danger"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default User;
