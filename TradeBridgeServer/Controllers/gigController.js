// controllers/gigController.js
const Gig = require("../Models/Gig");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "ddfhsv4xc",
  api_key: "253751116837458",
  api_secret: "7zMR-CaUfYOZoMq5n8GZ-TZyeKE",
});
const showGigs = async (req, res) => {
  try {
    const { sellerId } = req.query; 
    const gigs = await Gig.find({ seller: sellerId }); 
    res.status(200).json({ gigs: gigs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const addGig = async (req, res) => {
  const { category, product, description, price, seller } = req.body;

  try {
    const files = req.files.image;
    cloudinary.uploader.upload(

        files.tempFilePath,
        (cloudinaryErr, cloudinaryResult) => {
          if (cloudinaryErr) {
            return res
              .status(201)
              .json({ message: "Error uploading image to Cloudinary" });
          }

         
          const newGig = new Gig({
            category,
            product,
            description,
            price,
            seller,
            image:cloudinaryResult.url,
          });
      

          newGig
            .save()
            .then(() => {
              res
                .status(202)
                .json({ message: "Gig created successfully" });
            })
            .catch((saveErr) => {
              console.error("Error saving Gig to the database:", saveErr);
              res
                .status(201)
                .json({ message: "Error saving gig to the database" });
            });
        }
      );
    

    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  showGigs,
  addGig,
};
