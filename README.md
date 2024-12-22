# :rocket: TradeBridge

TradeBridge is a platform designed to streamline the process for traders and shippers to submit trade-related documents, while providing an easy way for the government to assess whether a product is eligible for import into Pakistan. This platform simplifies the interaction between buyers, sellers, and shippers, as well as government authorities.

---

## :star: Features

### :shopping_cart: **Buyer-Seller Interaction:**
- **Buyer Role:** A buyer can purchase a product and communicate with the seller. They can also act as a seller by adding their own gigs (products) for sale.
- **Messaging:** The platform enables seamless messaging between buyers and sellers to clarify any product-related queries.

### :package: **Shipper Integration:**
- After the buyer purchases the product, they can hire a shipper. The shipper is responsible for sending the invoice to the government with all the necessary documents related to the product.

### :bank: **Government Integration:**
- **Invoice Submission:** The shipper submits the invoice and the related product documents to the government for review.
- **Tax Calculation:** The government calculates the tax based on the product's value.
- **Status Update:** After processing the invoice and calculating the tax, the government updates the status to indicate whether the product is cleared for import into Pakistan.

### :busts_in_silhouette: **User Roles:**
- **Buyer:** Can view products, message sellers, and hire shippers.
- **Seller:** Can list their products (gigs) for sale and communicate with potential buyers.
- **Shipper:** Manages the shipping and invoicing process and interacts with the government for tax calculations and clearance.
- **Government Official:** Reviews submitted invoices, calculates tax, and updates the import clearance status.

---

## :wrench: Tech Stack

- **Frontend:** React, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (for storing product, user, and transaction data)
- **Message Integration:** Integrated messaging system for communication between users

---

## :computer: How to Use

1. **Sign Up:** Create an account on the platform to act as a Buyer, Seller, or Shipper.
2. **Browse Products:** Buyers can browse available products (gigs) and interact with sellers.
3. **Hire a Shipper:** After purchasing, the buyer can hire a shipper for the product's delivery and submit invoices.
4. **Government Processing:** Shippers submit invoices with product details for government review. The government calculates tax and updates the import clearance status.

---

## :package: Installation Instructions

### For Development

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/tradebridge.git
    ```

2. Install dependencies for both the frontend and backend:
    ```bash
    cd TradeBridgeClient
    npm install

    cd ../TradeBridgeServer
    npm install
    ```

3. Run the application:
    - **Frontend:** Run `npm start` inside the `TradeBridgeClient` directory.
    - **Backend:** Run `npm start` inside the `TradeBridgeServer` directory.

---

## :memo: Contribution

Feel free to fork this project and create pull requests for bug fixes or new features. Please make sure to follow the code style and include proper tests for new features.

---


