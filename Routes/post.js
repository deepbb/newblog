const router = require("express").Router()

const Post = require("../models/Post")

//creating a post

router.post("/", async (req,res)=>{
        const newPost = await new Post(req.body)
    try {
        const post =  await newPost.save()
        res.status(200).json(post)

    } catch (err) {
        res.status(401).json(err)
    }

})

//updating a post

router.put("/:id", async(req,res)=> {
    try {
        const post = await  Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body,
                },{new:true})
                res.status(200).json(updatedPost)
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("Access denied for updating a post")
        }

    } catch(err) {
        res.status(500).json(err)
    }
})

//delete post

router.delete("/:id", async(req,res)=> { 
    const post = await Post.findById(req.params.id)
    if(post.username === req.body.username) {
        try {
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("Post deleted")
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("Access denied")
    }
})

//get a post

router.get("/:id", async(req,res)=> {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json("post not found")
    }
    
})

router.get("/", async (req,res)=> {
    const username = req.query.user
    const catName = req.query.cat 
    try {
        let posts;
        if(username) {
            posts = await Post.find({username})
        } else if(catName) {
            posts = await Post.find({ categories :{
                $in:[catName]
            }})
        } else {
            posts = await Post.find()
        }
        res.status(200).json(posts)
        
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router

// req.body.postid === req.params.id