import classroom from "../assets/class.svg";
import Login from "./Login";
import Register from "./Register";
import { useState } from "react";
import RegInfo from "./RegInfo";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [regStatus, setRegStatus] = useState(false);
  const [userId, setUserId] = useState("");

  const toggleForm = () => {
    setShowLogin((prevState) => !prevState);
  };
  const handleSuccessfulReg = () => {
    setRegStatus(true);
    setUserId(userId)
  }

  return (
    <section className="landing">
      <div className="info">
        <div className="welcome">
          <h2>Welcome to</h2>
          <h1>CLASSROOM</h1>
        </div>

        <img src={classroom} alt="Classroom" />
        <p>Where you connect with friends, share resources, learn, and teach</p>
      </div>
      <div className="rform">
        <div className="acct">
          {regStatus ? (
            <RegInfo />
          ) : showLogin ? (
            <>
              <Login />
              <p>
                Don&apos;t have an account?{" "}
                <span onClick={toggleForm}>Register</span>
              </p>
            </>
          ) : (
            <>
              <Register handleSuccessfulReg = {handleSuccessfulReg} />
              <p>
                Already have an account? <span onClick={toggleForm}>Login</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Landing;
