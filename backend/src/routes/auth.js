const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/nodemailer")
const generator = require("generate-password");

// signup route to register new user
router.post("/signUp", async (req, res) => {
  try {
    // Lets get the name and email from the request body
    const { username, email } = req.body;
    console.log("Request", req.body);
    // Lets check if the email is already in the database
    const userAlreadyExists = await User.findOne({ email });

    // If the user exists then we will send an error message
    if (userAlreadyExists) {
      res.status(401).json({ message: "Soory, This user is already Resgisterd, Please Proceed to Login." });
      return;
    }

    //generating random password through "generate-password", library of nodejs 
    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
    });

    // Lets send the password to the user via email
    sendEmail(email, "You have been registered as a new user!", `${password} is your password proceed to Login`);

    // converting password to hashed to save in DB
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Lets create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("Signup succeed");
  } catch (error) {
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Lets get the email and password from the request body
    const { email, password } = req.body;

    // Lets check if the email is in the database
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // Lets check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).send("Wrong password");
      return;
    }
    // Lets create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    if (token) {
      res.send({Name: user.username, token});
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
