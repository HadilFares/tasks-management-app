import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup,
} from "@progress/kendo-react-excel-export";
//import ReactToExcel from "react-html-table-to-excel";
//import ReactExport from "react-data-export";

import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [userList, setuserList] = useState([]);
  //const [data, setData] = useState([]);

  const [fromDate, setDate1] = useState();
  const [toDate, setDate2] = useState();
  const [totalUser, setTotalUsers] = useState();

  const filteredUser = async (date1, date2) => {
    if (typeof date1 != "undefined" || typeof date2 != "undefined") {
      await axios
        .get(`http://localhost:3000/search/${date1}/${date2}`)
        .then((response) => {
          //setuserList(response.data);
          /* let object = response.data;
          setGetUserList(object);
          let date = [{ date1: date1, date2: date2 }];*/
          setuserList(response.data);
          setTotalUsers(response.data.length);
          console.log(userList);
        });
    } else {
      const result = await axios.get("http://localhost:3000/read");
      setuserList(result.data.reverse());
    }
  };

  /*
  useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:3000/read").then((r) => setData(r.data));
    };
    fetchData();
  }, [],[data]);
*/
  useEffect(
    () => {
      filteredUser();
    },
    [],
    [userList]
  );

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3000/read");
    setuserList(result.data.reverse());
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/delete/${id}`);
    loadUsers();
  };
  const _exporter = React.createRef();

  const excelExport = () => {
    if (_exporter.current) {
      _exporter.current.save();
    }
  };

  let _export;

  const Export = () => {
    const options = _export.workbookOptions();
    const rows = options.sheets[0].rows;
    options.sheets[0].frozenRows = 2;
    const headerRow = {
      height: 20 ,
      cells: [
        {
          value: `Fromdate: ${fromDate}`,
          fontSize: 18,
          colSpan: 3,
        },
        {
          value: `Todate: ${toDate}`,
          fontSize: 18,
          colSpan: 3,
        },
      ],
    };
    const footerRow = {
      height: 20,
      cells: [{ value: `Total users ${totalUser}`, fontSize: 18, colSpan: 3 }],
    };
    rows.unshift(headerRow);
    rows.push(footerRow);
    _export.save(options);
  };
  return (
    <>
      <div className="row my-5">
        <div className="col">
          <h4 className="border-bottom">Filters</h4>
        </div>
        <Form onSubmit={() => filteredUser(fromDate, toDate)}>
          <div className="col-sm-12 my-2">
            <label htmlFor="startDate">From</label>
            <input
              type="date"
              name="date1"
              className="form-control"
              onChange={(e) => setDate1(e.target.value)}
            />
          </div>
          <div className="col-sm-12 my-2">
            <label htmlFor="endDate">To</label>
            <input
              type="date"
              name="date2"
              className="form-control"
              onChange={(e) => setDate2(e.target.value)}
            />
          </div>
          {/*<button type="submit" onClick={()=>filteredUser(fromDate, toDate)}>submit</button>*/}
          <div className="text-center">
            <Button
              variant="primary"
              onClick={() => filteredUser(fromDate, toDate)}
            >
              Search
            </Button>
          </div>
        </Form>
      </div>
      <div className="container">
        <div className="py-4">
          <h1>Home Page</h1>

          <table id="tblData" className="table border shadow">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>

                <th scope="col">User_ID</th>
                <th scope="col">Name</th>
                <th scope="col">LastName</th>
                <th scope="col">hiring date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, id) => (
                <tr key={id}>
                  <th scope="row"></th>
                  <td>{user.matricule}</td>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>
                    {
                      (user.dateDemarrage = moment(user?.dateDemarrage).format(
                        "YYYY / MM / DD"
                      ))
                    }
                  </td>
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
      <div>
        <button className="k-button" onClick={Export}>
          Export to Excel
        </button>

        <ExcelExport
          data={userList}
          fileName="excel.xlsx"
          headerPaddingCellOptions={{
            background: "#ff0000",
          }}
          ref={(exporter) => (_export = exporter)}
        >
          <ExcelExportColumn field="matricule" title="User_Id" />
          <ExcelExportColumn field="name" title="Name" />
          <ExcelExportColumn field="lastname" title="LastName" />
          <ExcelExportColumn field="dateDemarrage" title="Hiring Date" />
        </ExcelExport>
      </div>
    </>
  );
};

export default Home;
