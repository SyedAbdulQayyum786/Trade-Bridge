import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminRequest() {
  const [requests, setRequests] = useState([]);
  const [action, setAction] = useState(false);
  const logedUser = useSelector((state) => state.login.user);
  useEffect(() => {
    try {
      axios
        .get("http://localhost:8080/admin/requests")
        .then((res) => {
          if (res.status === 200) {
            setRequests(res.data.requests);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.error("Error fetching requests:", err);
        });
    } catch (error) {
      alert("Error in useEffect:");
    }
  }, [action]);

  const viewDocument = (docLink) => {
    window.open(docLink, "_blank");
  };
  console.log(requests);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  const calculateTax = async (document,reqId) => {
    console.log(document);
    try {
      const res = await axios.post(
        "http://localhost:8080/admin/extract-invoice",
        { pdfUrl: document }
      );
      if (res.status === 200) {
        console.log(res.data.textData);
        const product = res.data.textData.product;
        console.log("product", product[0]);
        checkAllowed(product[0],reqId);
      } else {
        alert("Cannot calculate tax");
      }
    } catch (err) {
      console.error("Error:", err.message);
      alert("Internal server error");
    }
  };

  const checkAllowed = async (product,reqId) => {
    const name = product.productName.toLowerCase();
    const unitCost = product.unitCost;
    const quantity = product.quantity;
    const total = product.total;
    console.log(name);
    try {
      const res = await axios.get("http://localhost:8080/product/tax", {
        params: { name },
      });
      if (res.status === 200) {
        const tax=res.data.tax
        const finalAmount=calculateTotalPriceWithTax(total,tax)
        updatePrice(finalAmount,reqId)
      } else if(res.status==201){
        console.log("not")
        alert(`Cannot find tax for item "${name}" Please Add first`);
      }
    } catch (err) {
      console.error("Error:", err.message);
      alert("Server error");
    }
  };
  function calculateTotalPriceWithTax(totalPrice, taxRate) {
    // Convert totalPrice and taxRate to numbers explicitly
    totalPrice = parseFloat(totalPrice);
    taxRate = parseFloat(taxRate);
  
    const taxAmount = totalPrice * (taxRate / 100);
    const totalPriceWithTax = totalPrice + taxAmount;
  
    return {
      taxAmount: taxAmount.toFixed(2), // Convert toFixed result to string with 2 decimal places
      totalPriceWithTax: totalPriceWithTax.toFixed(2), // Convert toFixed result to string with 2 decimal places
    };
  }
  
  
  const updatePrice=async(amount,reqId)=>{
   try {
    const res = await axios.patch(`http://localhost:8080/shipper/updateamount/${reqId}`, {
      amount:amount
    });
    if (res.status === 200) {
      alert("Tax has been calculated successfully");
      setAction(!action)
    } else {
      alert("Cannot calculate tax");
    }
    
   } catch (error) {
    
   } 
  }
console.log(requests)
  return (
    <div className="userhome">
      <AdminDashboard />
      <div>
        <button
          type="button"
          className="btn btn-link mb-3"
          onClick={handleBackClick}
          style={{ color: "green" }}
        >
          <FaArrowLeft /> Back
        </button>
      </div>
      <div className="container-fluid center-content">
        <div className="center-icons">
          <div className="messageDisplay mb-3 text-center">
            <p
              className="text-danger font-weight-bold blink-me"
              style={{ fontSize: "24px", width: "550px", height: "50px" }}
            >
              Manage Requests
            </p>
          </div>
          <div className="row">
            <div className="col">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="bg-success text-white">
                    <tr>
                      <th className="text-center">Sender</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request, index) => (
                      <tr key={index}>
                        <td>{request.shipperId.companyName}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => viewDocument(request.docLink)}
                          >
                            View
                          </button>

                          <button
                            className="btn btn-success"
                            onClick={() => {
                              calculateTax(request.docLink,request._id);
                            }}
                          >
                            Calculate Tax
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
