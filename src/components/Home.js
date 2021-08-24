import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [userList, setuserList] = useState([]);
  
  const [search,setSearch]=useState('');
  const [filteredUsers,setfilteredUsers]=useState([]);
  
  
  useEffect(() => {
    
   loadUsers();
  }, []);

  useEffect(()=>{
    setfilteredUsers(
      userList.filter(person=>{
        return person.name.toLowerCase().includes(search.toLowerCase())
      })
    )

  },[search,userList]);
  
  

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
          <input className="form-control"
          
          type="search" 
          placeholder="search"
          name="searchTerm"
          onChange={e=>setSearch(e.target.value)}>
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
            {filteredUsers.map((user,id) => (
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