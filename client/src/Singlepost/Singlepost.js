import axios from "axios"
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router"
import {AuthContext} from "../Context/AuthContext"
// import Sidebar from "../Sidebar/Sidebar"
import "./Singlepost.css"

function Singlepost() {
    const location = useLocation()
    const PF = "http://localhost:5000/images/";
    const path = location.pathname.split("/")[2]
    const { user } = useContext(AuthContext)
    const [post,setPost] = useState ({})
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [updateMode , setUpdateMode] = useState(false)

    useEffect(()=> {
        const fetchPost = async ()=> {
                const res = await axios.get("/post/" + path)
                console.log(res.data);
                setPost(res.data) 
        }
        fetchPost()
    },[path])

    const handleDelete = async ()=> {
        try {
            const res = await axios.delete(`/post/${post._id}`,{
                data : {username:user.username}
            })
            console.log(res);
            window.location.replace("/");
        } catch (err) {

        }

    }

    const handleUpdate =async ()=> {
        try {
            const res = await axios.put (`/post/${post._id}`,{
                username:user.username,
                title,
                desc
            })
            console.log(res);
            // window.location.replace("/")
            setUpdateMode(false)
        } catch (err) {
            
        }

    }
    return (
        <div className="singlepost-display">
          <div className="singlepost">
              <div className="singlepost-wrapper">
              {post.photo &&
                <img className="singlepost-img"
                 src={PF+post.photo}
                alt="" /> 
                }
                {updateMode ? (
                    <input type="text"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)} />
                ) : (

                
                <h1 className="singlepost-title">{post.title}
                {post.username === user?.username && (
                <div className="singlepost-icon">
                <i className="iconEdit far fa-edit" onClick={()=> setUpdateMode(true)}></i>
                <i className="iconDelete fas fa-trash-alt" onClick={handleDelete}></i>
                </div>)}
                </h1>
                )}
                    <div className="singlepost-info">
                    
                        <span className="author">Author : <b> <Link className="link" to={`/?user=${post.username}`}>{post.username}</Link></b></span> 
                        <span className="time">Created at :{new Date(post.createdAt).toDateString()}</span>
                    </div>
                    {updateMode ? (
                        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} />
                    ) : (
                        <p className="desc">{post.desc}</p> 
                    )}
                    {updateMode && (
                        <button onClick={handleUpdate}>Update Post</button>
                    )}
                    
            </div>
            <hr/>
            </div>
            <div className="Singlepost-sidebar">
            {/* <Sidebar /> */}
            </div>
           
            
        </div>
    )
}

export default Singlepost
