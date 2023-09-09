import classroom from "../assets/newbg.jpg";

const Profile = () => {
  return (
    <>
      <section className="profile">
        <div className="coverPic">
          <img src={classroom} alt="" />
        </div>
        <img src={classroom} className="profilePic"/>
        <div className="whitespace"></div>
        <div className="profileInfo">
          <div className="userName">Abdullahi Ismail</div>
          <div className="userOccup">Web Developer</div>
          <div className="profileBio">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
            deleniti.
          </div>
        </div>

        <div className="profileContact">
          <button>Call</button>
          <button>Whatsapp</button>
        </div>

        <div className="profileAbout">
          <div className="personalDetails">
            <div className="profileEmail">
              <span>Email:</span>
              <div>abdullahabuaslam@gmail.com</div>
            </div>
            <div className="profileNumber">
              <span>Phone Number:</span>
              <div>07035974746@gmail.com</div>
            </div>
            <div className="profileAddress">
              <span>Email:</span>
              <div>Tudun Jukun Zaria</div>
            </div>
          </div>

          <div className="educationDetails">
            <div className="profileInstitution">
              <span>Institution:</span>
              <div>Federal University Dutsin ma</div>
            </div>
            <div className="profileCourse">
              <span>Course:</span>
              <div>Computer Science & IT</div>
            </div>
            <div className="profileLevel">
              <span>Level:</span>
              <div>300 Level</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
