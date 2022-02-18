import Singlepost from "../../Singlepost/Singlepost"
import Sidebar from "../../Sidebar/Sidebar"
import "./Single.css"

function Single() {
    return (
        <div className="ss">
        <div className="single">
            <Singlepost />
            <Singlepost />
            <Singlepost />
            
        </div>
        <div className="single-sidebar">
            <Sidebar />
        </div>
        </div>
    )
}

export default Single
