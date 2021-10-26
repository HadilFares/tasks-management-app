import React, { useState } from "react";
import { FormContainer } from "../../components";
import { Form, Button } from "react-bootstrap";
import Yamde from "yamde";
import axios from "axios";
import { useHistory } from "react-router";

function NewTask() {
  const [Title, setTitle] = useState();
  const [Datedebut, setDateDebut] = useState();
  const [Datefin, setDatefin] = useState();
  const [Description, setDescription] = useState();
  const [Priority, setPriority] = useState();
  const history = useHistory();

  const submitForm = async () => {
    const task = {
      Title,
      Datedebut,
      Datefin,
      Description,
      Priority,
      Statut: "todo",
    };
    try {
      const result = await axios.post("http://localhost:3000/tasks", task);
      console.log(result.data);
      history.push("/Dashboard");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <FormContainer>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <input
            type="date"
            name="Datedebut"
            className="form-control"
            onChange={(e) => setDateDebut(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <input
            type="date"
            name="Datefin"
            className="form-control"
            onChange={(e) => setDatefin(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option key="Low" value="low">
              Low
            </option>
            <option key="Medium" value="medium">
              Normal
            </option>
            <option key="High" value="high">
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
            toolbar={["bold", "italic", "heading1", "heading2", "heading3"]}
          />
        </Form.Group>

        <div className="text-center" style={{ margin: 25 }}>
          <Button variant="primary" onClick={() => submitForm()}>
            Submit
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}
export default NewTask;
