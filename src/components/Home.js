import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link ,useParams } from "react-router-dom";
const Home = () => {
  const [userList, setuserList] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
   loadUsers();
  }, []);

  

  const loadUsers = async() =>{
    const result=await axios.get('http://localhost:3000/read');
    setuserList(result.data.reverse());
  };
  const deleteUser = async id =>{
    await axios.delete(`http://localhost:3000/delete/${id}`);
    loadUsers();
  };
  const filterContent=(userList,searchTerm)=>{
    const result=userList.filter(
      (user)=>
      user.matricule.includes(searchTerm)||
      user.name.toLowerCase().includes(searchTerm)||
      user.lastname.toLowerCase().includes(searchTerm)
    );
    this.setState({userList:result});
  }
const handleTextSearch=(e)=>{
  const searchTerm=e.currentTarget.value;
   axios.get('http://localhost:3000/read').then ((res)=>{
    if(res.data.succes){
      filterContent(res.data.userList,searchTerm)
    }
  }
  )
    

}
  

  
  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <div className="col-lg-9 mt -2 mb-2">
          <input className="form-control"
          
          type="search" 
          placeholder="search"
          name="searchTerm"
          onChange={handleTextSearch}>
          </input>

        </div>
        <table className="table border shadow">
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
            {userList.map((user,id) => (
              <tr key={id}>
               <th scope="row"></th>
                
                <td>{user.matricule}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.dateDemarrage}</td>
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