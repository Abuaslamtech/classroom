import { useEffect, useState } from "react";
import { VscListFilter } from "react-icons/vsc";
import {
  getDocs,
  collection,
  QuerySnapshot,
  query,
  where,
  doc,
  updateDoc,
  increment
} from "firebase/firestore";
import { firestore } from "../config";
import Filter from "./Filter";

const Download = () => {
  const [filter, setFilter] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [fileId, setFileId] = useState([]);
  const [queryTerm, setQueryTerm] = useState("");
  const [newFilterTerm, setNewFilterTerm] = useState({
    institution: "",
    faculty: "",
    department: "",
    courseCode: "",
    userStatus: "",
    year: "",
  });

  useEffect(() => {
    retrieveFiles(newFilterTerm);
  }, [newFilterTerm]);

  const receiveData = (data) => {
    setNewFilterTerm(data);
  };

  const retrieveFiles = (filters) => {

    const filesCollection = collection(firestore, "files");

    let filterTerm = query(filesCollection);

    if (filters.institution) {
      filterTerm = query(
        filterTerm,
        where("institution", "==", filters.institution)
      );
    }

    if (filters.faculty) {
      filterTerm = query(filterTerm, where("faculty", "==", filters.faculty));
    }

    if (filters.department) {
      filterTerm = query(
        filterTerm,
        where("department", "==", filters.department)
      );
    }

    if (filters.courseCode) {
      filterTerm = query(
        filterTerm,
        where("courseCode", "==", filters.courseCode)
      );
    }

    if (filters.userStatus) {
      filterTerm = query(
        filterTerm,
        where("userStatus", "==", filters.userStatus)
      );
    }

    if (filters.year) {
      filterTerm = query(filterTerm, where("year", "==", filters.year));
    }

    getDocs(filterTerm)
      .then((QuerySnapshot) => {

        
        const filesData = QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllFiles(filesData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // change case
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  // set query value
  const getQueryValue = (e) => {
    setQueryTerm(toTitleCase(e.target.value));
    console.log(queryTerm);
  };

  // Function to perform the search
  const performSearch = () => {
    const q = query(
      collection(firestore, "files"),
      where("courseCode", "==", queryTerm)
    );

    getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        setFileId(querySnapshot.docs[0].id);

        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllFiles(results);
      })
      .catch((error) => {
        console.error("Error searching Firestore:", error);
      });
  };

  

  // filter
  const displayFilter = () => {
    setFilter(true);
  };
  const closeFilter = () => {
    setFilter(false);
  };

  return (
    <>
      {filter ? (
        <Filter
          filter={filter}
          closeFilter={closeFilter}
          onReceiveData={receiveData}
        />
      ) : null}
      <div className={filter === true ? "hideBg" : "mainFiles"}>
        <div className="rsearch">
          <input type="search" placeholder="CMP 321" onChange={getQueryValue} />
          <button onClick={performSearch}>Search</button>
          <VscListFilter className="filter" onClick={displayFilter} />
        </div>
        <div className="docs">
          {allFiles.map((file) => (
            <div className="files" key={file.id}>
              <div className="name"> {file.name}</div>
              <div className="file">
                <div className="left">
                  <div className="meta_info">
                    <div className="mright">
                      <div className="size">
                        <span className="mrdata1">Department</span>
                        {file.department}
                      </div>
                      <div className="size">
                        <span className="mrdata2">Course Code</span>
                        {file.courseCode}
                      </div>
                      <div className="size">
                        <span className="mrdata3">User Status</span>
                        {file.userStatus}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="report">Report</div>
                  <div className="file_download">
                    <a href={file.url} >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Download;
