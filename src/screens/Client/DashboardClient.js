import React, { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import { Accordion, Form, Button, ListGroup } from "react-bootstrap";

import RealtimeBoard from "react-trello";
import { useHistory /* useParams*/ } from "react-router";

import axios from "axios";
import moment from "moment";
import Yamde from "yamde";
import { Loader } from "../../components";

function DashboardClientScreen() {
  const [data, setData] = useState([]);
  const [done, setDone] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [Title, setTitle] = useState();
  const [Datedebut, setDateDebut] = useState();
  const [IdPersonne, setIdPersonne] = useState();
  const [Datefin, setDatefin] = useState();
  const [Description, setDescription] = useState();
  const [Priority, setPriority] = useState();
  const [Statut, setStatut] = useState();
  const [taskToDelete, setTaskToDelete] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setLoading(true);
  };
  const handleShow = () => setShow(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const history = useHistory();

  const filterData = (data) => {
    const todo = data.filter((ticket) => ticket.Statut === "todo");
    const inProgress = data.filter((ticket) => ticket.Statut === "inprogress");
    const done = data.filter((ticket) => ticket.Statut === "done");
    setTodo(todo);
    setInProgress(inProgress);
    setDone(done);
    console.log(todo);
    console.log(done);
    console.log(inProgress);
  };

  // * GET SELECTED TICKET
  const getSelectedTicket = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/task/${id}`);
      setDescription(response.data.Description);
      setSelectedTicket(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // * GET ALL Tasks
    const getTickets = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks`);
        filterData(response.data);
        console.log(response.data);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTickets();
  }, []);

  //* UPDATE Tasks
  const updateData = async (e) => {
    try {
      //e.preventDefault();
      const dataToUpdate = {
        Title,
        Datedebut,
        Datefin,
        Priority,
        Description,
        Statut,
      };
      console.log(dataToUpdate);
      const response = await axios.put(
        `http://localhost:3000/update/task/${selectedTicket._id}`,
        dataToUpdate
      );
      console.log(response);
      //history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // * UPDATE REQUEST STATUS
  const updateRequestStatus = async (newStatus, requestId) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/update/task/${requestId}`,
        { Statut: newStatus }
      );
      console.log(res);
      setSuccessMessage(res.data.msg);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  //* DELETE REQUEST
  const deleteRequest = async (id) => {
    try {
      //* we need delete comments before delete req

      const response = await axios.delete(
        `http://localhost:3000/delete/task/${id}`
      );
      console.log(response);
      handleCloseDelete();
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //* ADD NEW COMMENT
  const addComment = async () => {
    let name = localStorage.getItem("name");
    let id = localStorage.getItem("id");

    try {
      const newResponse = {
        date: Date.now(),
        user_name: name,
        text: comment,
        id,
      };
      console.log(newResponse)
      const res = await axios.put(
        `http://localhost:3000/add/comment/${selectedTicket._id}`,
        {
          date: Date.now(),
          user_name: name,
          text: comment,
          id,
        }
      );
      window.location.reload()
    } catch (error) {
      console.log({error});
    }
  };
  return (
    <>
      <RealtimeBoard
        //data={data} draggable
        data={{
          lanes: [
            {
              id: "todo",
              title: "ToDo",
              style: {
                width: 280,
              },
              cards: todo.map((req) => ({
                id: req._id,
                title: req.Title,
                tags: [
                  req.Priority === "high"
                    ? {
                        bgcolor: "#EB5A46",
                        color: "white",
                        title: "High",
                      }
                    : req.Priority === "medium"
                    ? {
                        bgcolor: "#61BD4F",
                        color: "white",
                        title: "medium",
                      }
                    : {
                        title: "Low",
                      },
                ],
                title: req.Title,
              })),
            },
            {
              id: "inprogress",
              title: "InProgress",
              style: {
                width: 280,
              },
              cards: inProgress.map((req) => ({
                id: req._id,
                title: req.Title,
                tags: [
                  req.Priority === "high"
                    ? {
                        bgcolor: "#EB5A46",
                        color: "white",
                        title: "High",
                      }
                    : req.Priority === "medium"
                    ? {
                        bgcolor: "#61BD4F",
                        color: "white",
                        title: "normal",
                      }
                    : {
                        title: "Low",
                      },
                ],
                title: req.Title,
              })),
            },
            {
              id: "done",
              title: "Done",
              style: {
                width: 280,
              },
              cards: done.map((req) => ({
                id: req._id,
                title: req.Title,
                tags: [
                  req.Priority === "high"
                    ? {
                        bgcolor: "#EB5A46",
                        color: "white",
                        title: "High",
                      }
                    : req.Priority === "medium"
                    ? {
                        bgcolor: "#61BD4F",
                        color: "white",
                        title: "medium",
                      }
                    : {
                        title: "Low",
                      },
                ],
              })),
            },
          ],
        }}
        tagStyle={{
          fontSize: "80%",
        }}
        draggable
        //   onBeforeCardDelete={function noRefCheck(cardId){handleShowDelete()}}
        onCardDelete={(cardId) => deleteRequest(cardId)}
        onCardClick={function noRefCheck(cardId) {
          // alert(cardId)
          getSelectedTicket(cardId).then(setShow(true));
        }}
        style={{
          fontFamily: "Arial",
          padding: "30px 20px",
          background: "white",
        }}
        onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) => {
          updateRequestStatus(toLaneId, cardId);
        }}
      />

      <Modal
        aria-labelledby="example-modal-sizes-title-lg"
        size="lg"
        show={show}
        onHide={handleClose}
      >
        {loading ? (
          <Form.Group className="mb-5">
            <div className="text-center" style={{ marginTop: 40 }}>
              <Loader />
            </div>
          </Form.Group>
        ) : (
          <>
            <Form onSubmit={updateData}>
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Update Task
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="show-grid">
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={selectedTicket.Title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <input
                    type="date"
                    name="Datedebut"
                    className="form-control"
                    defaultValue={moment(selectedTicket.Datedebut).format(
                      "yyyy-MM-DD"
                    )}
                    onChange={(e) => setDateDebut(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <input
                    type="date"
                    name="Datefin"
                    className="form-control"
                    defaultValue={moment(selectedTicket.Datefin).format(
                      "yyyy-MM-DD"
                    )}
                    onChange={(e) => setDatefin(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-5">
                  <Form.Label>Priority</Form.Label>

                  <Form.Control
                    as="select"
                    defaultValue={selectedTicket.Priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option key="low" value="low">
                      Low
                    </option>
                    <option key="medium" value="medium">
                      Medium
                    </option>
                    <option key="high" value="high">
                      High
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Yamde
                    value={Description}
                    handler={setDescription}
                    theme="dark"
                    toolbar={[
                      "bold",
                      "italic",
                      "heading1",
                      "heading2",
                      "heading3",
                    ]}
                  />
                </Form.Group>
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Comments box</Accordion.Header>
                    <Accordion.Body>
                      {selectedTicket.Comments.map(
                        ({ id, date, text, user_name }) => (
                          <ListGroup.Item key={id}>
                            {console.log({
                              id,
                              date,

                              text,
                              user_name,
                            })}
                            <strong>{user_name}</strong>
                            <p>{date.substring(0, 10)}</p>
                            <h5>
                              <p1>{text}</p1>
                            </h5>
                          </ListGroup.Item>
                        )
                      )}
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-5">
                        <Button
                          //type="submit"
                          variant="primary"
                          onClick={() => addComment()}
                        >
                          Submit
                        </Button>
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  type="submit"
                  // onClick={() => updateData()}
                >
                  Update
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          </>
        )}
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteRequest(taskToDelete)}
            type="Submit"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DashboardClientScreen;
