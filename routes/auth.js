const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
        isPoet: req.body.isPoet,
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json("Wrong credentials");
        }

        // Decrypt the stored password
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        // Check if the password matches
        if (originalPassword !== password) {
            return res.status(401).json("Wrong password");
        }

        // Generate access token
        const accessToken = jwt.sign(
            {
                id: user._id,
                isPoet: user.isPoet,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        // Exclude the password from the response
        const { password: _, ...others } = user._doc;

        // Send the response
        res.status(200).json({ ...others, accessToken });

    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router