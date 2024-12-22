const User = require("../Models/User");
const ShipperRequest = require("../Models/shipperRequest");
const governmentRequest = require("../Models/governmentRequest");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "ddfhsv4xc",
  api_key: "253751116837458",
  api_secret: "7zMR-CaUfYOZoMq5n8GZ-TZyeKE",
});
const book = async (req, res) => {
  try {
    const { shipperId, details, traderId } = req.body;
    const file = req.files.invoice;

    // Ensure file is single
    const singleFile = file;

    // Upload PDF file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(singleFile.tempFilePath, {
      resource_type: 'raw', // Ensure the file is handled correctly
      format: 'pdf', // Ensure the format is set to pdf
      flags: 'attachment:false' // Ensure the file is viewable in browser
    });

    // Extract URL of uploaded file
    const docLink = uploadResult.secure_url; // Use secure_url to ensure HTTPS link

    // Create a new shipper request
    const newShipperRequest = new ShipperRequest({
      shipperId: shipperId,
      traderId: traderId,
      details: details,
      status: 'p',
      docLink: docLink, // Single string URL
    });

    // Save the new shipper request
    await newShipperRequest.save();

    res.status(200).json({ message: 'Shipper request created successfully', docLink: docLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const fetchRequests = async (req, res) => {
  try {
    const { id, find, status } = req.query;
    let requests;
    if (find === "s") {
      requests = await ShipperRequest.find({ shipperId: id, status:status  })
      .populate("traderId")
      .populate("shipperId");
    } else if (find === "t") {
      requests = await ShipperRequest.find({ traderId: id })
        .populate("traderId")
        .populate("shipperId");
    }
    res.status(200).json({ requests: requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const manageRequests = async (req, res) => {
  try {
    const { id, find, status } = req.query;
    let requests;
    if (find === "s") {
      requests = await ShipperRequest.find({
        shipperId: id,
        status: { $in: ['a', 's','c','f','u'] }
    })
    .populate("traderId")
    .populate("shipperId");
    }
    res.status(200).json({ requests: requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const accept = async (req, res) => {
  const { id } = req.params;

  try {
    const shipperRequest = await ShipperRequest.findById(id);
    if (!shipperRequest) {
      return res.status(404).json({ message: "Shipment request not found" });
    }
    shipperRequest.status = req.body.status;
    await shipperRequest.save();
    res.status(200).json({ message: "Shipment request accepted successfully" });
  } catch (error) {
    console.error("Error accepting shipment request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const sendDocuments = async (req, res) => {
  try {
    const { shipperId, docLink, details } = req.body;

    // Create a new government request
    const newGovernmentRequest = new governmentRequest({
      shipperId: shipperId,
      docLink: docLink,
      details: details,
      status: 'p' // Assuming 'p' is the default status
    });

    // Save the new government request
    await newGovernmentRequest.save();

    res.status(200).json({ message: 'Documents sent to government successfully', docLink: docLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const markRequestAsSent = async (req, res) => {
  const { id } = req.params;

  try {
    const shipperRequest = await ShipperRequest.findById(id);
    if (!shipperRequest) {
      return res.status(404).json({ message: "Shipment request not found" });
    }

    shipperRequest.status = 's'; // Update status to 's' for sent
    await shipperRequest.save();

    res.status(200).json({ message: "Request marked as sent successfully" });
  } catch (error) {
    console.error("Error marking request  sent:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateStatus = async (req, res) => {
  const requestId = req.params.requestId;
  const { status } = req.body;

  try {
    // Check if the request exists
    const request = await ShipperRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update the status of the request
    request.status = status;
    await request.save();

    // Respond with success message
    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateAmount=async(req,res)=>{
  const requestId = req.params.requestId;
  const { amount } = req.body;
  console.log(requestId,amount)
  try {
    // Check if the request exists
    const request = await ShipperRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update the status of the request
    request.status = "u";
    request.amount=amount["totalPriceWithTax"]
    await request.save();

    // Respond with success message
    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server Error' });
  }


}
const addService=async(req,res)=>{
  const requestId = req.params.requestId;
  const { amount } = req.body;
  console.log(requestId,amount)
  try {
    // Check if the request exists
    const request = await ShipperRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update the status of the request
    request.status = "u";
    request.amount=amount
    await request.save();

    // Respond with success message
    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server Error' });
  }


}
module.exports = { updateStatus,addService,updateAmount,book, fetchRequests, accept,sendDocuments,markRequestAsSent,manageRequests };
