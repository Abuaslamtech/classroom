import { useState } from "react";
import Download from "../components/Download";
import Upload from "../components/Upload";

const Resources = () => {
  const [activeComponent, setActiveComponent] = useState("download");

  const handleClick = (activeComponent) => {
    setActiveComponent(activeComponent);
  };

  return (
    <>
      <section>
        <div className="sections">
          <div
            className={activeComponent === "download" ? "download" : "upload"}
            onClick={() => handleClick("download")}
          >
            Resources
          </div>
          <div
            className={activeComponent === "upload" ? "download" : "upload"}
            onClick={() => handleClick("upload")}
          >
            Upload Resources
          </div>
        </div>
        {activeComponent === "download" && <Download />}
        {activeComponent === "upload" && <Upload />}
      </section>
    </>
  );
};

export default Resources;
