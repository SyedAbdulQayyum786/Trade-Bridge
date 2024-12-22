import React, { useEffect, useState, useRef } from "react";
import { BsCardList } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import UserDashboard from "./UserDashboard";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

export default function InvoiceForm() {
  const logedUser = useSelector((state) => state.login.user);
  const [sellers, setSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [perPrice, setPerPrice] = useState("");
  const [total, setTotal] = useState("");
  const selectedSeller = useRef();
  const selectedCategory = useRef();
  const selectedProduct = useRef();
  const location = useLocation();
  const [productname, setProductname] = useState("");
  const [productcategory, setProductcategory] = useState("");
  const [sellername, setsellername] = useState("");
  const [selleremail, setselleremail] = useState("");
  const [sellerphonenumber, setsellerphonenumber] = useState("");
  const [productdescription, setProductdescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productname = searchParams.get("productName");
    setProductname(productname);
    const productcategory = searchParams.get("productCategory");
    setProductcategory(productcategory);
    const sellername = searchParams.get("sellername");
    setsellername(sellername);
    const selleremail = searchParams.get("selleremail");
    setselleremail(selleremail);
    const sellerphonenumber = searchParams.get("sellerphonenumber");
    setsellerphonenumber(sellerphonenumber);
    const productdescription = searchParams.get("productDescription");
    setProductdescription(productdescription);
  }, [location]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/showsellers", {
        params: { username: logedUser.username },
      })
      .then((res) => {
        if (res.status === 202) {
          setSellers(res.data.sellers);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching sellers:", err);
      });

    axios
      .get("http://localhost:8080/category/allcategories")
      .then((res) => {
        if (res.status === 200) {
          setCategories(res.data.categories);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, [logedUser.username]);

  useEffect(() => {
    const totalPrice = quantity * perPrice;
    setTotal(totalPrice);
  }, [quantity, perPrice]);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    axios
      .get(
        `http://localhost:8080/product/productbycategoryid/${selectedCategoryId}`
      )
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.products);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  };

  const downloadInvoice = async (e) => {
   

    if (!quantity || quantity <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    const invoiceData = {
      buyer: {
        name: logedUser.companyName,
        email: logedUser.email,
        phoneNumber: logedUser.phoneNumber,
        postal_code: 94111,
      },
      seller: {
        name: sellername,
        email: selleremail,
        phoneNumber: sellerphonenumber,
        postal_code: 94111,
      },
      items: [
        {
          name: productname,
          category: productcategory,
          description: productdescription,
          quantity: quantity,
          amount: quantity * perPrice,
        },
      ],
      logo: logedUser.image,
      subtotal: total,
      paid: 0,
      invoice_nr: 1234,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/invoice/download",
        invoiceData,
        {
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      navigate("/shipment");
    } catch (error) {
      console.error("Error generating invoice:", error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const form = e.target;
    if (form.checkValidity()) {
      // Proceed with generating the invoice
      downloadInvoice();
    } else {
      // If the form is not valid, trigger HTML5 form validation
      form.reportValidity();
    }
  };
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  return (
    <div className="userhome">
      <UserDashboard />
      <div className="container-fluid scroll">
      <button
                  type="button"
                  className="btn btn-link mb-3"
                  onClick={handleBackClick}
                  style={{color:"green"}}
                >
                  <FaArrowLeft /> Back
                </button>
        <header className="text-center mb-4 m-5">
          <h2 className="display-4">Hello! Seller</h2>
          <p className="lead">Kindly fill out this invoice form</p>
        </header>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card" style={{ border: "2px solid #000000" }}>
              <div className="card-body">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="seller" className="form-label">
                      <BsCardList className="me-2" /> Seller Name
                    </label>
                    <select
                      style={{ border: "2px solid #000000" }}
                      className="form-select"
                      id="seller"
                      name="seller"
                      value={sellername}
                      onChange={(e) => setsellername(e.target.value)}
                      required
                    >
                      <option value="">Select Seller</option>
                      {sellers.map((seller) => (
                        <option key={seller.username}>
                          {seller.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="buyerName" className="form-label">
                      <BsCardList className="me-2" /> Buyer Name
                    </label>
                    <input
                      style={{ border: "2px solid #000000" }}
                      type="text"
                      className="form-control"
                      id="buyerName"
                      name="buyerName"
                      value={logedUser.companyName}
                      readOnly
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      <BsCardList className="me-2" /> Category
                    </label>
                    <input
                      style={{ border: "2px solid #000000" }}
                      className="form-control"
                      id="category"
                      name="category"
                      value={productcategory}
                      readOnly
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productName" className="form-label">
                      <BsCardList className="me-2" /> Product Name
                    </label>
                    <input
                      style={{ border: "2px solid #000000" }}
                      className="form-control"
                      id="productName"
                      name="productName"
                      required
                      value={productname}
                      readOnly
                    />
                  </div>{" "}
                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                      <BsCardList className="me-2" /> Quantity
                    </label>
                    <input
                      style={{ border: "2px solid #000000" }}
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(0, parseInt(e.target.value)))
                      }
                      min="1"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="unitPrice" className="form-label">
                      <BsCardList className="me-2" /> Unit Price
                    </label>
                    <div className="input-group">
                      <span
                        className="input-group-text"
                        style={{ border: "2px solid #000000" }}
                      >
                        $
                      </span>
                      <input
                        style={{ border: "2px solid #000000" }}
                        type="number"
                        className="form-control"
                        id="unitPrice"
                        name="unitPrice"
                        value={perPrice}
                        onChange={(e) =>
                          setPerPrice(Math.max(0, parseFloat(e.target.value)))
                        }
                        min="0.01"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="totalAmount" className="form-label">
                      <BsCardList className="me-2" /> Total Amount
                    </label>
                    <input
                      style={{ border: "2px solid #000000" }}
                      type="text"
                      className="form-control"
                      id="totalAmount"
                      name="totalAmount"
                      value={total}
                      readOnly
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">
                      <BsCardList className="me-2" /> Due Date
                    </label>
                    <input
                      style={{ border: "2px solid #000000" }}
                      type="date"
                      className="form-control"
                      id="dueDate"
                      name="dueDate"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-success">
                      Generate Invoice
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
