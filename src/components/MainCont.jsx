import { useState } from "react";
import Resources from "../pages/Resources";
import About from "../pages/About";
import Chatroom from "../pages/Chatroom";
import Community from "../pages/Community";
import News from "../pages/News";
import Profile from "../pages/Profile";
import Mentorship from "../pages/Mentorship";

const MainCont = ({ active }) => {


  return (
    <>
      <section className="maincont">
        {active === "resources" && <Resources/>}
        {active === "about" && <About />}
        {active === "chatroom" && <Chatroom />}
        {active === "community" && <Community />}
        {active === "news" && <News />}
        {active === "nprofileews" && <Profile />}
        {active === "mentorship" && <Mentorship />}
      </section>
    </>
  );
};

export default MainCont;
