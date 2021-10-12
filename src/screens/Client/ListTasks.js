import React , {useState,useEffect} from "react"
import {FormContainer} from "../../components"
import { Form, ListGroup, Badge } from "react-bootstrap";
import axios from "axios"
import {Link} from "react-router-dom"
function ListTasks(){
    const [data,setData]=useState([]);

useEffect(()=>{
    const getTasks=async()=>{
        try {
         const response=await axios.get("http://localhost:3000/read/tasks");
         setData(await response.data);
         console.log(response.data)
        }catch (error){
            console.log(error);

        }
    };
    getTasks();
},[]);


    return (
        <FormContainer>
         <Form.Group className="mb-5">
             <ListGroup>
                 {data.map((item)=>(
                     <Link  style={{textDecoration:'none'}} to ={`task/${item._id}`}>
                    <ListGroup.Item action href={`task/${item._id}`}>
                        <h5>
                            #{item._id}
                            {item.Title}
                        </h5>
                    {item.Status==="todo" ? (
                        <Badge pill bg="info" text="light">
                            {item.Status}
                        </Badge>
                    ):item.status==="inprogress"?(
                     <Badge pill bg="info" text="light"  >
                         {item.Status}
                     </Badge>
                    ):item.status==="done" ?(
                        <Badge pill bg="info" text="light">
                         {item.Status}
                        </Badge>
                    ):(
                        <Badge pill bg="info" text="light">
                            {item.Status}
                        </Badge>
                    )}
                    <div>
                    Priority : {
                        item.Priority==="high"?(
                            <Badge pill bg ="danger" text="light">
                                {item.Priority}
                            </Badge>
                        ):item.Priority==="medium"?(
                            <Badge>
                                {item.Priority}
                            </Badge>
                        
                        ):(
                            <Badge pill bg="success" text="light">
                             {item.Priority}
                            </Badge>
                        )}
                    </div>

                    </ListGroup.Item>
                    </Link>
                 ))}
             </ListGroup>

         </Form.Group>
        </FormContainer>
    );
}

export default ListTasks;