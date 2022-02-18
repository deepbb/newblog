import "./Write.css"
import axios from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../../Context/AuthContext"

function Write() {
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [file,setfile] = useState(null)
    const {user} = useContext(AuthContext)
    console.log(user.username);

    const clickhandler = async (e)=> {
        e.preventDefault()
        const newPost = {
            username:user.username,
            title,
            desc
        }
        if (file) {
            const data = new FormData()
            const filename =file.name;
            console.log(filename);
            data.append("name",filename)
            data.append("file", file);
            newPost.photo = filename;
            console.log(newPost);
            try {
                const res = await axios.post("/upload",data)
                console.log(res);
            } catch (err) {
    
            }
            try {
                const res = await axios.post ("/post/" , newPost)
                console.log(res);
                window.location.replace("/post/" + res.data._id)
            } catch (err) {

            }
        }
        
    }
    return (
        <div className="write">
        {file && (
            <img src={URL.createObjectURL(file)} className="write-img" alt="" />
        )}
            {/* <img className="write-img" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
             alt="" /> */}
            <form className="write-form" onSubmit={clickhandler}>
                <div className="write-form-group">
                    <label className="write-label" htmlFor="write-input">
                    <i className="write-icon fas fa-plus-square"></i>
                    </label>
                    <input
                     className="write-input" id="write-input" 
                     type="file" 
                     onChange={(e)=>setfile(e.target.files[0])}
                     style={{display:"none"}}
                      autoFocus={true} />
                    <input
                     className="write-text-input"
                      type="text"
                      value={title}
                      onChange={(e)=>setTitle(e.target.value)}
                      placeholder="Title of your story"
                       autoFocus={true} />
                </div>
                <div className="write-text">
                    <textarea 
                    className="write-story" type="text"
                    value={desc}
                    onChange={(e)=>setDesc(e.target.value)}
                     placeholder="Tell your story" autoFocus={true} />
                </div>
                    <button className="write-btn" type="submit">Publish</button>
            </form>
        </div>
    )
}

export default Write
