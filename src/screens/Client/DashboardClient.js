import React, { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import {Accordion, Form, Button, ListGroup } from "react-bootstrap";

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
  const [IdPersonne,setIdPersonne]=useState();
  const [Datefin, setDatefin] = useState();
  const [Description, setDescription] = useState();
  const [Priority, setPriority] = useState();
  const [Statut, setStatut] = useState();
  const [taskToDelete , setTaskToDelete] = useState();
  const [Loader, setLoader] = useState();
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[showDelete, setShowDelete] = useState(false);
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
      /* setReq_type(response.data[0].req_type);
      setReq_title(response.data[0].req_title);
      setPriority(response.data[0].Priority);
      setReq_description(response.data[0].req_description);
      setReq_status(response.data[0].req_status);*/
      setSelectedTicket(response.data[0]);
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
        Title: selectedTicket.Title,
        Datedebut: selectedTicket.Datedebut,
        Datefin: selectedTicket.Datefin,
        Priority: selectedTicket.Priority,
        Description: selectedTicket.Description,
        Statut: selectedTicket.Statut,
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
 /* const deleteComments = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/response/${id}`
      );
      console.log("comments deleted seccussfuly");
    } catch (error) {
      console.log(error);
    }
  }*/
// * GET RESPONSE COMMENTS
/*const getResponseComments = async (id) => {
  try {
    await axios
      .get(`http://localhost:3001/response/${id}`)
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
        //  getUserById(comments);
      });
  } catch (error) {
    console.log(error);
  }
};
*/
//* ADD NEW COMMENT
const addComment = async () => {
  try {
    const newResponse = {
      request_req_id: selectedTicket.req_id,
     
      res_text: comment,
      //user_name: user_name,
    };
    const res = await axios.post(
      `http://localhost:3000/add/comment`,
      newResponse
    );
    console.log(res);
    //getResponseComments();
    handleClose();
    updateData();
  } catch (error) {
    console.log(error);
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
      {/*<OnUpdateScreen
        show={modalShow}
        selectedTicket={selectedTicket}
        onHide={() => {
          getTickets();
          setModalShow(false);
        }}
      />
      */}

      <Modal
        aria-labelledby="example-modal-sizes-title-lg"
        size="lg"
        show={show}
        onHide={handleClose}
      >
        loading ? (
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
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={selectedTicket.Description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={selectedTicket.Priority}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>StartDate</Form.Label>
                  <input
                    type="date"
                    name="date1"
                    className="form-control"
                    defaultValue={moment(selectedTicket.Datedebut).format(
                      "yyyy-MM-DD"
                    )}
                    onChange={(e) =>setDateDebut(e.target.value.toString())}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>EndDate</Form.Label>
                  <input
                    type="date"
                    name="date1"
                    className="form-control"
                    defaultValue={moment(selectedTicket.Datefin).format(
                      "yyyy-MM-DD"
                    )}
                    onChange={(e) =>setDateDebut(e.target.value.toString())}
                  />
                </Form.Group>
                
                <Form.Group className="mb-5">
                  <Yamde
                    value={Description}
                    handler={Description}
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
                      {comments.map(
                        ({ id, res_date,  res_text, user_name }) => (
                          <ListGroup.Item key={id}>
                            {console.log({
                              id,
                              res_date,
                              
                              res_text,
                              user_name,
                            })}
                            <strong>{user_name}</strong>
                            <p>
                              {res_date.substring(0, 10)}
                             
                            </p>
                            <h5>
                              <p1>{res_text}</p1>
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
                  onClick={() => updateData()}
                >
                  Update
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
            </Modal.Footer>
            </Form>
          </>
        
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
