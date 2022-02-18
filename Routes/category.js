const router = require ("express").Router()

const Category = require("../models/Category")

//post a category

router.post("/", async(req,res)=> {
    const newCategory = await new Category(req.body)
    try {
        const category = await  newCategory.save()
        res.status(200).json(category)
    } catch (err) {
        res.status(401).json("not able to post a category")
    }
})

//get a category

router.get("/:id", async(req,res)=> {
        //const category = await new Category(req.params.id)
        try {
            const categoryList = await  Category.findById(req.params.id)
            res.status(200).json(categoryList)
        } catch (err) {
            res.status(401).json(err)
        }
})

router.get("/", async (req,res)=> {
    try {
        const category = await Category.find()
        res.status(200).json(category)
    } catch (err) {
        res.status(401).json(err)
    }
})


module.exports = router