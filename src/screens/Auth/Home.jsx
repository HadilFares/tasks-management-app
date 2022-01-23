import React from "react";
import AddTask from "../../assets/AddTask.svg"
import './style.css';
function Home() {
  return (
    <div  className="img">
      <img src={AddTask} alt="logo"  width={"800px"} height={"400px"} />
    </div>
  );
}

export default Home;
