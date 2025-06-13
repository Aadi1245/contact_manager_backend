const asyncHandler = require("express-async-handler");
const User = require("../modals/userModel.js");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc register user
// @route post /user/register
// @access Public

const userRegister = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    console.log("user body :", req.body);
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash password
    const hashedPassword = await bcript.hash(password, 10);
    console.log("Hashed password is :", hashedPassword);

    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    });

    if (user) {
        res.json({
            _id: user.id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid!");
    }

    return res.json({ message: "User registered successfully!" });
});

//@desc login user
// @route post /user/login
// @access Public

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    console.log("The user is :", email, password);

    const user = await User.findOne({ email });
    console.log("The user is :", user);
    console.log("The user password is :", password, user.password);
    const isValidPassword = await bcript.compare(password, user.password);
    if (user && isValidPassword) {
        console.log("The user password is :", process.env.ACCESS_TOKEN_SECRET);

        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user._id
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            });
        console.log("The 2 user is :", accessToken);

        res.status(200).json({
            accessToken
        });
    } else {
        res.status(401);
        throw new Error("Email or Password is not valid!");
    }

    res.json({ message: "User Login successfully!" });
});

//@desc current user
// @route post /user/current
// @access private

const currentUser = asyncHandler(async (req, res) => {

   
    res.json(req.user);
});

module.exports = { userRegister, userLogin, currentUser };