import { useState } from "react";

const Filter = ({ closeFilter, onReceiveData }) => {
  const [newFilterTerms, setNewFilterTerms] = useState({
    institution: "",
    faculty: "",
    department: "",
    courseCode: "",
    userStatus: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFilterTerms({ ...newFilterTerms, [name]: value });
  };

  const sendData = () => {
    onReceiveData(newFilterTerms);
    closeFilter();
  };

  return (
    <>
      <div className="filterSearch">
        <div className="filterCont">
          <h2>Filter Files by</h2>
          <div className="filterForm">
            <input
              type="text"
              placeholder="Institution"
              name="institution"
              value={newFilterTerms.institution}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Faculty"
              name="faculty"
              value={newFilterTerms.faculty}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Department"
              name="department"
              value={newFilterTerms.department}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Course code"
              name="courseCode"
              value={newFilterTerms.courseCode}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="User Status"
              name="userStatus"
              value={newFilterTerms.userStatus}
              onChange={handleChange}
            />
            <input
              type="number"
              min={2012}
              max={2023}
              placeholder="Year"
              name="year"
              value={newFilterTerms.year}
              onChange={handleChange}
            />
          </div>
          <div className="filterActions">
            <button onClick={sendData}>Save</button>
            <button onClick={closeFilter}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
