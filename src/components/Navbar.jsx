import { app } from "../config";
import { PiFilesFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoIosChatboxes } from "react-icons/io";
import { HiNewspaper } from "react-icons/hi";
import { BiSolidUserCircle } from "react-icons/bi";
import { BiSolidHelpCircle } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = ({ setActive, nav, isVisible }) => {
  const [activeLink, setActiveLink] = useState("resources");
  const [result, setResult] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  const handleClick = (content, e) => {
    setActive(content);
    setActiveLink(content);
  };

  // log out
  const handleLogOut = () => {
    const auth = getAuth(app);

    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      handleTest(newWidth);
    };

    window.addEventListener("resize", handleResize);
    handleTest(width);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible, width]);

  const handleTest = (newWidth) => {
    setResult(newWidth <= 720 && isVisible);
  };

  return (
    <section className={result ? "hidenavBar" : "navbar"}>
      <div className="welcome">
        <h1>Welcome to</h1>
        <h2>CLASSROOM</h2>
      </div>

      <nav className="">
        <div
          className={`list ${activeLink === "resources" ? "active" : ""}`}
          onClick={(e) => handleClick("resources", e)}
        >
          <PiFilesFill />
          <div>Resources</div>
        </div>
        <div
          className={`list ${activeLink === "mentorship" ? "active" : ""}`}
          onClick={(e) => handleClick("mentorship", e)}
        >
          <FaChalkboardTeacher />
          <div>Mentorship</div>
        </div>
        <div
          className={`list ${activeLink === "community" ? "active" : ""}`}
          onClick={(e) => handleClick("community", e)}
        >
          <IoIosPeople />
          <div>Community</div>
        </div>
        <div
          className={`list ${activeLink === "chatroom" ? "active" : ""}`}
          onClick={(e) => handleClick("chatroom", e)}
        >
          <IoIosChatboxes />
          <div>Chatroom</div>
        </div>
        <div
          className={`list ${activeLink === "news" ? "active" : ""}`}
          onClick={(e) => handleClick("news", e)}
        >
          <HiNewspaper />
          <div>News Updates</div>
        </div>
        <div
          className={`list ${activeLink === "profile" ? "active" : ""}`}
          onClick={(e) => handleClick("profile", e)}
        >
          <BiSolidUserCircle />
          <div>Profile</div>
        </div>
        <div
          className={`list ${activeLink === "about" ? "active" : ""}`}
          onClick={(e) => handleClick("about", e)}
        >
          <BiSolidHelpCircle />
          <div>About</div>
        </div>
      </nav>
      <div className="logout">
        <TbLogout2 />
        <div className="link" onClick={handleLogOut}>
          Log Out
        </div>
      </div>
    </section>
  );
};

export default Navbar;
