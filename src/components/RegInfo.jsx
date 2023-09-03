import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../config";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const RegInfo = () => {
  const [fullname, setFullname] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const handleInfo = () => {
    const firestore = getFirestore(app);

    if (user) {
      const userId = user.uid;
      const email = user.email;

      const userRef = doc(firestore, "users", userId);
      setDoc(userRef, {
        email: email,
        fullname: fullname,
        department: department,
        faculty: faculty,
        level: level,
      })
        .then(() => {
          setSuccessMessage("Data Submitted successfully");
          navigate("/dashboard");
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };
  return (
    <>
      <h2>Update Profile</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Faculty"
        value={faculty}
        onChange={(e) => setFaculty(e.target.value)}
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <input
        type="number"
        placeholder="Level"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />

      <button onClick={handleInfo}>Confirm</button>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </>
  );
};

export default RegInfo;
