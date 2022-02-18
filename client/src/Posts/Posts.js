import Post from "../Post/Post"
import "./Posts.css"

function Posts({posts}) {
    return (
        <div className="post">
        {posts.map((p,index)=>(
            <Post key={index} post={p} />
        ))}
            
            {/* <Post />
            <Post />
            <Post />
            <Post />
            <Post /> */}
        </div>
    )
}

export default Posts
