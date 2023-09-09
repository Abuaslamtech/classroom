import MainCont from "../components/MainCont";
import Navbar from "../components/Navbar";
import menu from "../assets/menu.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../config";
import { getAuth } from "firebase/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const [active, setActive] = useState("resources");
  const [isVisible, setIsVisible] = useState(true);
  const width = window.innerWidth;
  

const hideMenu =()=>{
  setIsVisible(!isVisible);
}
  return (
    <>
    
      <div className="mobilemenu">
        <h2>Classroom</h2>
        <img src={menu} alt="" onClick={hideMenu} />
      </div>
      <section className="dashboard">
        <Navbar setActive={setActive} hideMenu={hideMenu} isVisible={isVisible} width={width}/>
        <MainCont active={active} />
      </section>
    </>
  );
};

export default Dashboard;
