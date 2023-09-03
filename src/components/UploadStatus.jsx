import complete from "../assets/complete.gif";
import uploading from "../assets/uploading.gif";

const UploadStatus = ({closeProgress, progress}) => {
    console.log(progress)
    return (
        <div className="layer">
            <div className="ustatus">
                <div className="ucompleted"><img src={progress == 100 ? complete : uploading} alt="" /></div>
                <div className="progressCont" >
                    <div className="progressStatus" style={{width: `${progress}%`}}></div>
                    </div>
                <div className="progressreading">{`Uploading: ${progress}%`}</div>
                <button onClick={closeProgress} disabled={progress < 100}>Close</button>
            </div>
        </div>
     );
}
 
export default UploadStatus;