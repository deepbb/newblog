const express = require ("express")

const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const multer  = require("multer")
const path = require("path")
var cors = require('cors')
const authRoute = require("./Routes/auth")
const userRoute = require("./Routes/User")
const postRoute = require("./Routes/post")
const categoryroute = require("./Routes/category")

 

dotenv.config();
app.use(express.json())
app.use(cors())

app.use("/images",express.static(path.join(__dirname,"/images")))


// mongoose.connect(process.env.DATABASE,
//     {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
//            console.log("DB CONNECTED");
//        }).catch((err)=>{
//            console.log(err);
//        })

mongoose.connect(process.env.MONGO_URL).then(
    console.log("Database connected")).catch(err=>{
        console.log(err);
    })
    
   //"mongodb://localhost:27017/myBlogApp"
    // const storage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //       cb(null, "images");
    //     },
    //     filename: (req, file, cb) => {
    //         cb(null, "gift.png");
    //       },
    //     });

    //     const upload = multer ({storage:storage})
    //     app.post("/api/upload", upload.single("file"), (req, res) => {
    //         // Stuff to be added later
    //         res.status(200).json("file has been uploaded successfully")
    //       })

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "images");
        },
        filename: (req, file, cb) => {
          console.log(file);
          cb(null, file.originalname);
        },
      });
      
      const upload = multer({ storage: storage });
      app.post("/api/upload", upload.single("file"), (req, res) => {
        console.log(req.body);
        console.log(req.file);
          try {
            res.status(200).json("File has been uploaded");
          } catch(err) {
              res.status(500).json(err)
          }
        
      });

app.use("/api/auth",authRoute)

app.use("/api/User",userRoute)

app.use("/api/post",postRoute)

app.use("/api/category",categoryroute)


__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"/client/build")));

  app.get("*",(req,res)=> {
    res.sendFile(path.resolve(__dirname,"client","build","index.html"))
  })
} else {
  app.get("/",(req,res)=> {
    res.send("API is runing")
  })
} 

app.listen(process.env.PORT ||  5000 , ()=> {
    console.log("server is up and running at port 5000");
})