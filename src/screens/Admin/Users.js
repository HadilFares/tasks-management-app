import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  ExcelExport,
  ExcelExportColumn,
} from "@progress/kendo-react-excel-export";
import Pagination from "./Pagination";
import User from "./User";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Users = () => {
  const [userList, setuserList] = useState([]);
  //const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [fromDate, setDate1] = useState();
  const [toDate, setDate2] = useState();
  const [totalUser, setTotalUsers] = useState();
  const indexOfLastUser = currentPage * postsPerPage;
  // console.log("indexOfLastPost: ", indexOfLastPost);

  const indexOfFirstUser = indexOfLastUser - postsPerPage;
  // console.log("indexOfFirstPost: ", indexOfFirstPost);

  const currentPosts = userList.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredUser = async (date1, date2) => {
    setLoading(true);
    if (typeof date1 != "undefined" || typeof date2 != "undefined") {
      await axios
        .get(`http://localhost:3000/search/${date1}/${date2}`)
        .then((response) => {
          setuserList(response.data);
          setTotalUsers(response.data.length);
          console.log(userList);
          setLoading(false);
        });
    } else {
      const result = await axios.get("http://localhost:3000/read");
      setuserList(result.data.reverse());
      setLoading(false);
    }
  };

  useEffect(
    () => {
      filteredUser();
    },
    [],
    [userList]
  );

  let _export;

  const Export = () => {
    const options = _export.workbookOptions();
    const rows = options.sheets[0].rows;
    options.sheets[0].frozenRows = 2;
    const headerRow = {
      height: 20,
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

          
            
              <User users={currentPosts} loading={loading} />
            
        </div>
      </div>
      <div style={{ marginLeft: "700px" }}>
        <Pagination
          paginate={paginate}
          postsPerPage={postsPerPage}
          totalPosts={userList.length}
        />
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
          <ExcelExportColumn field="name" title="Name" />
          <ExcelExportColumn field="lastname" title="LastName" />
          <ExcelExportColumn field="dateDemarrage" title="Hiring Date" />
        </ExcelExport>
      </div>
    </>
  );
};

export default Users;
