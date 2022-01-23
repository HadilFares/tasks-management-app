import React from "react";
import { Container, Row ,Col} from "react-bootstrap";
import AddTask from "../../assets/AddTask.svg"
import './style.css';
function Home() {
  return (
    <Container>
      <Row >
      <Col  className ="sample" style={{marginTop:"9%"}}>
 MyDesk  helps you to manage your daily to-do lists and  edit your tasks anytime and anywhere .
    </Col>
    <Col className="img" style={{marginBottom:"100%"}}>
      <img src={AddTask} alt="logo"  width={"800px"} height={"400px"} />
    </Col>
    </Row>
    </Container>
  );
}

export default Home;
