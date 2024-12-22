const fs = require("fs");
const PDFDocument = require("pdfkit");
const request = require("request");

async function generateInvoice(invoiceData, path) {
  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    generateHeader(doc, invoiceData.seller, invoiceData.logo);
    generateCustomerInformation(doc, invoiceData.buyer, invoiceData.seller);
    generateInvoiceTable(doc, invoiceData.items, invoiceData.buyer);
    generateFooter(doc);

    const writeStream = fs.createWriteStream(path);
    doc.pipe(writeStream);

    // Resolve the promise once the writing is finished
    writeStream.on("finish", resolve);

    // Reject the promise if there's an error
    writeStream.on("error", reject);

    // End the document
    doc.end();
  });
}

function generateHeader(doc, seller, logo) {
  try {
    // Download the seller logo from the URL
    request({ url: logo, encoding: null }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // Convert the downloaded image buffer to a base64 string
        const logoBase64 = Buffer.from(body).toString("base64");

        // Add the seller logo to the PDF document
        doc.image("data:image/png;base64," + logoBase64, 50, 45, { width: 50 });

        // Continue generating the rest of the header
        doc
          .fillColor("#444444")
          .fontSize(20)
          .text(seller.name, 110, 57) // Seller name
          .fontSize(10)
          .text(seller.address, 200, 65, { align: "right" })
          .text(
            seller.city + ", " + seller.state + ", " + seller.country,
            200,
            80,
            { align: "right" }
          )
          .moveDown();
      } else {
        console.log("Error downloading seller logo:", error);
        // If there's an error downloading the logo, continue generating the header without it
        doc
          .fillColor("#444444")
          .fontSize(20)
          .text(seller.name, 110, 57) // Seller name
          .fontSize(10)
          .text(seller.address, 200, 65, { align: "right" })
          .text(
            seller.city + ", " + seller.state + ", " + seller.country,
            200,
            80,
            { align: "right" }
          )
          .moveDown();
      }
    });
  } catch (err) {
    console.log(err);
  }
}

function generateCustomerInformation(doc, buyer, seller) {
  doc.fillColor("#FF0000").fontSize(20).text("Invoice", 50, 160);
  doc.fillColor("#444444").fontSize(20);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  // Buyer information
  doc
    .fontSize(10)
    .text("Buyer:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(buyer.name, 150, customerInformationTop)
    .font("Helvetica")
    .text(buyer.email, 150, customerInformationTop + 15)
    .text(buyer.phoneNumber, 150, customerInformationTop + 30);

  generateHr(doc, customerInformationTop + 60);

  // Seller information
  doc
    .fontSize(10)
    .text("Seller:", 50, customerInformationTop + 75)
    .font("Helvetica-Bold")
    .text(seller.name, 150, customerInformationTop + 75)
    .font("Helvetica")
    .text(seller.email, 150, customerInformationTop + 90)
    .text(seller.phoneNumber, 150, customerInformationTop + 105)
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, items, buyer) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < items.length; i++) {
    const item = items[i];
    item.name=item.name+":"
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.name,
      item.description,
      formatCurrency(item.amount / parseInt(item.quantity)), // Convert quantity to integer
      parseInt(item.quantity), // Convert quantity to integer
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(items[0].amount)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(0)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(items[0].amount)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y, { width: 100 })
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#00FF00").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + cents;
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  generateInvoice,
};
