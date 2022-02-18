import { Link } from "react-router-dom";
// import { useContext } from "react"
// import { AuthContext} from "../Context/AuthContext"
import "./Post.css";

function Post({ post }) {

    // const { user } = useContext(AuthContext)
    // console.log(user);
    const PF = `http://localhost:5000/images/`
    return (
        <div className="post">
        {post.photo  &&
            <img className="post-img"
                src={PF + post.photo}
                alt="hello" />
                }
                <div className="post-info">
                    <div className="post-cats">
                    {post.categories.map((c,index)=>(
                        <span className="post-cat" key={index}>{post.categories}</span>
                    ))}
                        
                        {/* <span className="post-cat">{post.categories}</span> */}
                    </div>
                    <Link to={`/post/${post._id}`} className="link">
                    <span className="post-title">{post.title}</span>
                    </Link>
                    <span className="post-date">{new Date(post.createdAt).toDateString()}</span>
                </div>
                <p className="post-desc">{post.desc}</p>
        </div>
    )
}

export default Post
