import "./Settings.css"
import Sidebar from "../../Sidebar/Sidebar"
import { useContext, useState } from "react"
import { AuthContext } from "../../Context/AuthContext"
import axios from "axios"
import Footer from "../Footer/Footer"

function Settings() {
    const PF = "http://localhost:5000/images/"
    const { user , dispatch } = useContext(AuthContext)
    const [file,setFile] = useState(null)
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [success, setsuccess] = useState(false)

    console.log(user.username);
    
    
    const handleUpdate = async (e)=> {
        e.preventDefault()
        dispatch({type:"UPDATE_START"})
        const newPost = {
            userid:user._id,
            username,
            email,
            password
        }
        if (file) {
            const data = new FormData()
            const filename =file.name;
            console.log(filename);
            data.append("name",filename)
            data.append("file", file);
            newPost.profilepic = filename;
            console.log(newPost);
            try {
                const res = await axios.post("/upload",data)
                console.log(res);
            } catch (err) {
    
            }
        }
            try {
                const res = await axios.put ("/User/" + user._id , newPost)
                console.log(res);
                dispatch({type:"UPDATE_SUCCESS", payload:res.data})
                setsuccess(true)
                //window.location.replace("/post/" + res.data._id)
            } catch (err) {
                dispatch({type:"UPDATE_FAILURE"})
            }
        }
        
    
   console.log(user._id);
    return (
        <div className="settings">
            <div className="settings-wrapper">
                <div className="settings-title">
                    <span className="settings-update">Update your Account</span>
                    <span className="settings-delete">Delete</span>
                </div>
                    <form className="settings-form" onSubmit={handleUpdate}>
                          <label className="profile-pic">Profile picture</label>  
                          <div className="settings-profilepic">
                            < img 
                            src={ file ? URL.createObjectURL(file) : PF+user.profilepic} className="settings-img" alt="" />
                               {/* <img className="settings-img" 
                              src={user.profilepic}
                              alt="" />  */}
                              <label htmlFor="fileInput">
                              <i className="icon fas fa-user-circle"></i>
                              </label>
                              <input type="file" id="fileInput"
                              onChange={(e)=>setFile(e.target.files[0])}
                               style={{display:"none"}} />
                          </div>
                          <label>Username</label>
                          <input type="text" placeholder={user.username}
                          value={username}
                          onChange={(e)=>setUsername(e.target.value)}
                           />
                          <label>Email</label>
                          <input type="email" placeholder={user.email}
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                           />
                          <label>password</label>
                          <input type="password" placeholder={user.password}
                          value={password}
                          onChange={(e)=> setPassword(e.target.value)}
                           />
                          <button type="submit">Update</button>
                          {success && 
                          <h1 style={{color:"teal",marginTop:"25px",marginLeft:"25%"}}>Your profile has been updated successfully!</h1>
                          }
                    </form>
            </div>
            
            <Sidebar />
            <Footer/>
        </div>
    )
}

export default Settings
