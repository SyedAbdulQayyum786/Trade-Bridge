const governmentRequest = require("../Models/governmentRequest");
const ShipperRequest=require("../Models/shipperRequest")
const axios = require("axios");
const { PDFDocument } = require("pdf-lib");
const pdfjsLib = require("pdfjs-dist");

const fetchGovernmentRequests = async (req, res) => {
  try {
    const governmentRequests = await ShipperRequest
    .find({ status: 's' }) // Query for documents where status is 's'
    .populate("shipperId");

    res.status(200).json({ requests: governmentRequests });
  } catch (error) {
    console.error("Error fetching government requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const extractData = async (req, res) => {
  const { pdfUrl } = req.body;

  try {
    // Fetch the PDF file from the URL
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const pdfBuffer = response.data;

    // Load the PDF document using pdf-lib
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    // Use pdfjs-dist to extract text
    const loadingTask = pdfjsLib.getDocument({ data: pdfBuffer });
    const pdf = await loadingTask.promise;

    let text = "";

    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      const pageText = textContent.items.map((item) => item.str).join(" ");
      text += pageText + "\n";
    }

    const buyerInfo = extractBuyerInfo(text);
    const sellerInfo = extractSellerInfo(text);
    const products = extractProducts(text);
    let textData = {
      buyer: buyerInfo,
      seller: sellerInfo,
      product: products,
    };

    res.status(200).json({ message: "Text extraction successful", textData });
  } catch (error) {
    console.error("Error extracting invoice:", error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
};

const extractBuyerInfo = (text) => {
  const buyerRegex = /Buyer:\s*(.*?)\s+(\S+@\S+)\s+(\d{10})/; // Updated regex for buyer info
  const match = text.match(buyerRegex);
  if (match) {
    const [, name, email, phone] = match;
    return { name, email, phone };
  }
  return null;
};

const extractSellerInfo = (text) => {
  const sellerRegex = /Seller:\s*(.*?)\s+(\S+@\S+)\s+(\d{10})/; // Updated regex for seller info
  const match = text.match(sellerRegex);
  if (match) {
    const [, name, email, phone] = match;
    return { name, email, phone };
  }
  return null;
};

const extractProducts = (text) => {
  const productsRegex =
    /Item Description\s*Unit Cost\s*Quantity\s*Total\s*([^$]+?)\s*\$([\d.]+)\s*(\d+)\s*\$([\d.]+)/g; // Updated regex for product info
  const products = [];
  let match;
  while ((match = productsRegex.exec(text)) !== null) {
    const [, itemDescription, unitCost, quantity, total] = match;

    // Extract product name and item description
    const colonIndex = itemDescription.indexOf(":");
    let productName, detailedDescription;

    if (colonIndex !== -1) {
      productName = itemDescription.slice(0, colonIndex).trim();
      detailedDescription = itemDescription.slice(colonIndex + 1).trim();
    } else {
      productName = itemDescription.trim();
      detailedDescription = itemDescription.trim();
    }

    products.push({
      productName,
      detailedDescription,
      unitCost,
      quantity,
      total,
    });
  }
  return products;
};

module.exports = { fetchGovernmentRequests, extractData };
