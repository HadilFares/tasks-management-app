import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Loader } from "../../components";

const AdminHome = () => {
  const [users, setUsers] = useState();
  const [taskStats, setTaskStats] = useState({});
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      await axios.get("http://localhost:3000/api/userStat").then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTasksStat = async () => {
    try {
      await axios.get("http://localhost:3000/api/tasksStat").then((res) => {
        console.log(res.data);
        setTaskStats(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    getTasksStat();
    setLoading(false)

    console.log(taskStats);
  }, []);

  return (
    <>
      {loading ? (
        <Form.Group className="mb-5">
          <div className="text-center" style={{ marginTop: 40 }}>
            <Loader />
          </div>
        </Form.Group>
      ) : (
        <div class="container-fluid">
          <div class="col-md-12 my-1">
            <div class="row">
              <div
                className="col-md-3 bg-success mx-2"
                style={{ height: 130, width: 800 }}
              >
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-8">
                      <h5
                        className="my-2 text-white text-center"
                        style={{ fontSize: 30 }}
                      >
                        {users}
                      </h5>
                      <h5 className="text-white">Total Users</h5>
                    </div>
                    <div className="col-md-4">
                      <h1>
                        <i
                          class="fas fa-users"
                          style={{ color: "white", marginTop: 45 }}
                        ></i>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-md-3 bg-danger mx-2"
                style={{ height: 130, width: 800 }}
              >
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-8">
                      <h5
                        className="my-2 text-white text-center"
                        style={{ fontSize: 30 }}
                      ></h5>
                      <h5 className="text-white">Total tasks</h5>
                    </div>
                    <div className="col-md-4">
                      <h1>
                        <i
                          class="fas fa-tasks"
                          style={{ color: "white", marginTop: 45 }}
                        ></i>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              
          <div
            className="col-md-3 bg-warning mx-2"
            style={{ height: 130, width: 800 }}
          >
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-8">
                  <h5
                    className="my-2 text-white text-center"
                    style={{ fontSize: 30 }}
                  >
                    {taskStats.todo}
                  </h5>
                  <h5 className="text-white">Opened Tasks</h5>
                </div>
                <div className="col-md-4">
                  <h1>
                    <i
                      class="fas fa-tasks"
                      style={{ color: "white", marginTop: 45 }}
                    ></i>
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-md-3 bg-dark mx-2"
            style={{ height: 130, width: 800, marginTop: 20 }}
          >
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-8">
                  <h5
                    className="my-2 text-white text-center"
                    style={{ fontSize: 30 }}
                  >
                    {taskStats.done}
                  </h5>
                  <h5 className="text-white">Closed Tasks</h5>
                </div>
                <div className="col-md-4">
                  <h1>
                    <i
                      class="fas fa-check-circle"
                      style={{ color: "white", marginTop: 45 }}
                    ></i>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-3 bg-primary mx-2"
            style={{ height: 130, width: 800, marginTop: 20 }}
          >
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-8">
                  <h5
                    className="my-2 text-white text-center"
                    style={{ fontSize: 30 }}
                  >
                    {taskStats.inProgress}
                  </h5>
                  <h5 className="text-white">in progress tasks</h5>
                </div>
                <div className="col-md-4">
                  <h1>
                    <i
                      class="fas fa-tasks"
                      style={{ color: "white", marginTop: 45 }}
                    ></i>
                  </h1>
                </div>
              </div>
            </div>
          </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHome;
