import { app } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = ({ handleSuccessfulReg }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState(null);


  const handleRegister = async () => {
    const auth = getAuth(app);

    try {
      const userAcc = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userAcc && userAcc.user) {
        // call successfulReg function
        handleSuccessfulReg();
        // naviaget to RegInfo
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h2>Registration</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={cpassword}
        onChange={(e) => setCpassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>}
    </>
  );
};

export default Register;
