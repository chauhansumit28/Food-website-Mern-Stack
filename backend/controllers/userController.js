const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require('crypto');
const nodemailer = require('nodemailer');


//login user
const logingUser = async (req, res) => {
  const {email,password} = req.body;
  try {
      const user = await userModel.findOne({email});

      if (!user) {
        return res.josn({success:false,message:"User Doesn't exist"})
      }

      const isMatch = await bcrypt.compare(password,user.password);

      if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"})
      }

      const token = createToken(user._id);
      res.json({success:true,token})


  }catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
};

const createToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //checking is user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }

    //validating email format & strong password
    if(!validator.isEmail(email)){
      return res.json({ success: false, message: "please enter a valid emali"})
    }

    if (password.length<8) {
        return res.json({success:false,message:"please enter a strong password"})
    }


    //hashing  user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new userModel({
      name:name,
      email:email,
      password:hashedPassword
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true,token})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
};


// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Update user profile
const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





const transporter = nodemailer.createTransport({
  service: 'gmail', // Example using Gmail; change it based on your service provider
  auth: {
    user: 'sumitptl70@gmail.com', // Your email
    pass: 'beyk iaww iasx kjgw', // Replace with your app-specific password
  },
});


const resetUser = async (req, res) => {
  const { email } = req.body;

  try {
    // Validate that email is provided
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a random password
    const newPassword = crypto.randomBytes(8).toString('hex'); // Generates a random 16 character string

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Send email with the new password
    const mailOptions = {
      from: 'sumitptl70@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Your new password is: ${newPassword}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Error sending email', error });
      }
      console.log('Email sent:', info.response); // Log the response for debugging
      res.json({ message: 'Password reset successfully and sent to your email' });
    });
  } catch (error) {
    console.error('Internal server error:', error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};






module.exports = {
  logingUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  resetUser,
};
