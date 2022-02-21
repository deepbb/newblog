import { useEffect, useState } from "react"
import Header from "../../Header/Header"
import Posts from "../../Posts/Posts"
import Sidebar from "../../Sidebar/Sidebar"
import "./Home.css"
import axios from "axios"
import { useLocation } from "react-router"
import Footer from "../Footer/Footer"

function Home() {
    const [posts,setPost] = useState([])

    const {search} = useLocation()

    useEffect (()=> {
        const fetchPosts = async ()=>{
             const res = await axios.get("http://localhost:5000/api/post/" + search)
             console.log(res.data);
             setPost(res.data)
        }
        fetchPosts()
    },[search])

    //"http://localhost:5000/api/"
    return (
        <>
        <Header/>
        <div className="home">
        <Posts posts={posts} />
        <Sidebar />
        </div>
        <Footer />
        </>
    )
}

export default Home
