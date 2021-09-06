import { useState ,useEffect} from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const FilterBar = ( ) => {
  const [fromDate, setDate1] = useState();
  const [toDate, setDate2] = useState();
  const [data, setData] = useState();

  const filteredUser = async (date1, date2) => {
    await axios
      .get(`http://localhost:3000/search/${date1}/${date2}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  };
  
  useEffect(() => {
    const fetchData = () =>{
     axios.get('http://localhost:3000/read').then(r => setData(r.data) )
    }
    fetchData()
  }, [])
  

  return (
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
  );
};
export default FilterBar;
