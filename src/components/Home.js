import React, { useState, useEffect} from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { ExportToExcel } from "./ExportToExcel";

import dayjs from "dayjs";
import FilterBar from "./FilterBar";
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);


const Home = () => {
  const [userList, setuserList] = useState([]);
  const[AllData,setAllData]=useState([]);
  const [data, setData] = React.useState([])
  const fileName = "myfile"; // here enter filename for your excel file

  useEffect(() => {
    const fetchData = () =>{
     axios.get('http://localhost:3000/read').then(r => setData(r.data) )
    }
    fetchData()
  }, [])
  
  useEffect(() => {
    
   loadUsers();
  }, []);

  
  
  const handleFilterDate = (date, field) => {
    const filteredData = userList.filter((item) => {
      if (field === "from" && dayjs(item.dateDemarrage).isSameOrAfter(dayjs(date))) {
        return item ;
      }
     });   
    setAllData(filteredData);
  };

  const loadUsers = async() =>{
    const result=await axios.get('http://localhost:3000/read');
    setuserList(result.data.reverse());
  };
  const deleteUser = async id =>{
    await axios.delete(`http://localhost:3000/delete/${id}`);
    loadUsers();
  };


 
  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <div className="col-lg-9 mt -2 mb-2">
         
         
          <FilterBar 
          onDateFilter={handleFilterDate}
          
          />
          <ExportToExcel apiData={data} fileName={fileName} />
        
       
        </div>
        <table id="tblData" className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
          
              <th scope="col">Matricule</th>
              <th scope="col">Name</th>
              <th scope="col">LastName</th>
              <th scope="col">DateDemarrage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
        
            {AllData.map((user,id) => (
              <tr key={id}>
               <th scope="row"></th>
                
                <td>{user.matricule}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{dayjs(user?.dateDemarrage).format("YYYY / MM / DD")}</td>
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
            ))}
          </tbody>
        </table>
      
      </div>
    </div>
  );
};

export default Home;