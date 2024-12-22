// controllers/userController.js

const User = require("../Models/User");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "ddfhsv4xc",
  api_key: "253751116837458",
  api_secret: "7zMR-CaUfYOZoMq5n8GZ-TZyeKE",
});

const signup = async (req, res) => {
  const { companyName, username, password, email, phoneNumber, signUpAs,companyDescription } =
    req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phoneNumber }],
    });

    if (existingUser) {
      res.status(201).json({
        message: "User with this email, username, or phone already exists",
      });
    } else {
      const files = req.files.image;
      console.log(files);
      cloudinary.uploader.upload(
        files.tempFilePath,
        (cloudinaryErr, cloudinaryResult) => {
          if (cloudinaryErr) {
            return res
              .status(201)
              .json({ message: "Error uploading image to Cloudinary" });
          }

          // Create a new user object with the provided data
          const newUser = new User({
            companyName,
            username,
            password,
            email,
            phoneNumber,
            signUpAs,
            companyDescription,
            image: cloudinaryResult.url,
          });

          // Save the user object to the database
          newUser
            .save()
            .then(() => {
              res
                .status(202)
                .json({ message: "User created successfully", user: newUser });
            })
            .catch((saveErr) => {
              console.error("Error saving user to the database:", saveErr);
              res
                .status(201)
                .json({ message: "Error saving user to the database" });
            });
        }
      );
    }

    // Upload image to Cloudinary
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(201).json({ message: "User not found" });
    }

    // Check if the provided password matches the user's password
    if (existingUser.password !== password) {
      return res.status(201).json({ message: "Incorrect password" });
    }

    // Login successful
    res.status(202).json({ message: "Login successful", user: existingUser });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal Server Error" });
  }
};

const showSellers = async (req, res) => {
  try {
    const username = req.query.username;
    // Find all users whose username is not equal to the provided username and signUpAs is 't'
    const sellers = await User.find({
      username: { $ne: username },
      signUpAs: "t",
    });
    res.status(202).json({ sellers: sellers });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal Server Error" });
  }
};
const showShippers = async (req, res) => {
  try {
    const username = req.query.username;
    // Find all users whose username is not equal to the provided username and signUpAs is 't'
    const shippers = await User.find({
      username: { $ne: username },
      signUpAs: "s",
    });
    res.status(202).json({ shippers: shippers });
  } catch (error) {
    console.error(error);
    res.status(201).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  signup,
  login,
  showSellers,
  showShippers,
};
