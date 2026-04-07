import React, { useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios'; 
import { toast } from 'react-toastify';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const url = "http://localhost:5000"; 

  const verifyPayment = useCallback(async () => {
    try {
      const response = await axios.post(`${url}/api/orders/verify`, { success, orderId });
      
      if (response.data.success) {
        toast.success("Order verified successfully!");
        navigate("/my-orders");
      } else {
        toast.error("Payment verification failed. Please try again.");
        navigate("/");
      }
    } catch (error) {
      console.error("Verification Error:", error);
      toast.error("Server Error! Please try again.");
      navigate("/");
    }
  }, [success, orderId, navigate]);

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    } else {
      navigate("/");
    }
  }, [success, orderId, verifyPayment, navigate]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      {/* YumDash Theme Spinner */}
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#FF6600] rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Verifying your payment, please wait...</p>
    </div>
  );
};

export default Verify;