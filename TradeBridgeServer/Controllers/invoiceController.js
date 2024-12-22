const path = require("path");
const fs = require("fs");
const { generateInvoice } = require("../invoice");

exports.generateInvoice = async (req, res) => {
  try {
    const invoice = req.body;
    const invoicePath = path.join(__dirname, `${Date.now()}_invoice.pdf`); // Unique file name

    await generateInvoice(invoice, invoicePath);

    //check for checking file existence
    if (fs.existsSync(invoicePath)) {
      res.download(invoicePath, "invoice.pdf", (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Could not generate invoice.");
        }

        fs.unlinkSync(invoicePath);
      });
    } else {
      res.status(500).send("Could not generate invoice.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while generating the invoice.");
  }
};
