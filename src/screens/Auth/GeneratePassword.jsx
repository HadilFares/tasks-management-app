import React ,{useState,useEffect} from 'react'
import { FormContainer } from "../../components";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import {useHistory} from "react-router";
import { useParams } from "react-router-dom";

function GeneratePassword() {
    const [password, setPassword] = useState();
    const params = useParams();
    const history = useHistory();

const generate = async () =>{
    let id=params.id;
    try{
       await axios.put(`http://localhost:3000/update/${id}`,{password})
        .then((res) => {
            console.log(res);
           });
           history.push('/login');
    }
    catch (error){
      console.log({error});
    }
}


useEffect(() => {
  
  localStorage.clear();
}, [])
    return (
        <FormContainer>
            <Form>
            <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}

          />
          </Form.Group> 
          <div class="text-center">
          <Button  onClick={()=> generate()}>
            Submit
          </Button>
        </div>
            </Form>
        </FormContainer>
    )
}

export default GeneratePassword
