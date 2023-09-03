import { useState, useEffect } from "react";
import { storage, firestore } from "../config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import UploadStatus from "./UploadStatus";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [faculty, setFaculty] = useState("");
  const [userStatus, setUserStatus] = useState("Member");
  const [btnClick, setBtnClick] = useState(false);
  const [progress, setProgress] = useState(0);

  let downloadCount=0;

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInstitution = (e) => {
    setInstitution(e.target.value);
  };

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleCourseCode = (e) => {
    setCourseCode(e.target.value);
  };
  const handleFaculty = (e) => {
    setFaculty(e.target.value);
  };

  const handleType = (e) => {
    setFileType(e.target.value);
  };
  const closeProgress = () => {
    setBtnClick(false);
  };

  const handleFileUpload = () => {
    setBtnClick(true);

    // change case
    const toTitleCase = (str) => {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    const storageRef = ref(storage, `uploads/${selectedFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // Update progress only if it's a new percentage value
        setProgress(uploadProgress);
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        getDownloadURL(storageRef)
          .then((downloadURL) => {
            return addDoc(collection(firestore, "files"), {
              name: toTitleCase(selectedFile.name),
              url: downloadURL,
              timestamp: new Date(),
              institution: toTitleCase(institution),
              department: toTitleCase(department),
              courseCode: toTitleCase(courseCode),
              faculty: toTitleCase(faculty),
              userStatus:toTitleCase(userStatus),
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  return (
    <>
      {btnClick ? (
        <UploadStatus closeProgress={closeProgress} progress={progress} />
      ) : (
        <div className="uform">
          <h2>Upload Resources</h2>
          <div className="inputs">
            <input type="file" onChange={handleFileChange} />
            <input
              type="text"
              placeholder="Resource type (Handout/Past-Q)"
              onChange={handleType}
            />
            <input
              type="text"
              placeholder="Unversity/Institution"
              onChange={handleInstitution}
            />
            <input
              type="text"
              placeholder="Course Code"
              onChange={handleCourseCode}
            />
            <input type="text" placeholder="Faculty" onChange={handleFaculty} />
            <input
              type="text"
              placeholder="Department"
              onChange={handleDepartment}
            />
          </div>
          <div className="submit">
            <button onClick={handleFileUpload}>Upload</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;
