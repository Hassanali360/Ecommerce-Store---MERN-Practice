const bcrypt = require("bcryptjs");
const User = require("../../models/User");
// ❌ your import was wrong
// const jwt = require("JsonWebTokenError");
// ✅ correct import
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => { 
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (e) {
    console.error("Register Error:", e);
    return res.status(500).json({
      success: false,
      message: e.message || "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkuser = await User.findOne({ email });
    if (!checkuser)
      return res.json({
        success: false,
        message: "user doesn't exists ! please register first",
      });

    const checkpasswordmatch = await bcrypt.compare(password, checkuser.password);
    if (!checkpasswordmatch)
      return res.json({
        success: false,
        message: "Incorrect Password ! try again",
      });

    // Generate Token
    const token = jwt.sign(
      { id: checkuser._id, email: checkuser.email },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "7d" }
    );

    // Store token in secure cookie
    res.cookie("token", token, {
      httpOnly: true, // stops JS from reading token
      secure: false, // set true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: checkuser._id,
        userName: checkuser.userName,
        email: checkuser.email,
      },
    });

  } catch (e) {
    console.error("Register Error:", e);
    return res.status(500).json({
      success: false,
      message: e.message || "Some error occurred",
    });
  }
};


module.exports = { registerUser, loginUser };
