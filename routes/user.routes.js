const router = require("express").Router();
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth.js")
// sign-up route

router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address, role } = req.body;
        
        // checking length of username
        if (username.length < 4) {
            return res.status(400).json({
                message: "username length should be greater than 3"
            });
        }
        
        // checking if user exists

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                message: "username already exist"
            });
        }

        //checking if email exists 

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: "user already exist with this email"
            });
        }
      
        // checking for password length

        if (password.length < 6) {
            return res.status(400).json({
                message: "password length should be greater than 5"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        // creating new user
        const newUser = await User.create({
            username,
            email,
            password:hashedPassword,
            address,
            role
        });

        return res.status(201).json({
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});


// sign in route

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const authClaims = {
      name: existingUser.username,
      role: existingUser.role
    };

    const token = jwt.sign(authClaims, "bookStore123", { expiresIn: "30d" });

    return res.status(200).json({
      id: existingUser._id,
      role: existingUser.role,
      token: token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

// get user-information

router.get("/get-user-information", authenticateToken,async(req,res)=>{
    try{
      const {id} = req.headers;
      const data = await User.findById(id).select("-password");
      return res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
})

// update address
router.put("/update-address",authenticateToken,async(req,res)=>{
    try{
   const {id}= req.headers;
   const {address} = req.body;
    await User.findByIdAndUpdate(id,{address:address});
    return res.status(200).json({message:"address updated successfully"});
    }
    catch(error){
      res.status(500).json({message:"internal server error"})
    }
})
module.exports = router;