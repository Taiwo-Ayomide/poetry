const router = require("express").Router();
const Poem = require("../model/Poem");
const {
    verifyToken,
    verifyTokenAndAdmin
} = require("./verifyToken");

// POST POEM
router.post("/post-poem", verifyTokenAndAdmin, async (req, res) => {
    const newPoem = new Poem({
        title: req.body.title,
        poet: req.body.poet,
        poem: req.body.poem,
    });
    try {
        const savedPoem = await newPoem.save();
        res.status(201).json(savedPoem)
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedPoem = await Poem.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedPoem)
    } catch (error) {
        res.status(500).json(error)
    }
});


// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
});

// GET POEM
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const poem = await Poem.findById(req.params.id)
        const { password, ...others } = poem._doc;

        res.status(200).json({others});
    } catch (error) {
        res.status(500).json(error)
    }
});


// GET ALL POEM
router.get("/allpoems", async (req, res) => {
    const query = req.query.new
    try {
        const poems = query 
            ? await Poem.find().sort({ _id:-1 }).limit(5)
            : await Poem.find();
        res.status(200).json(poems);
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router