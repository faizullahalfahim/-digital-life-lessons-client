import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure(); 
   const [searchParams, setSearchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    useEffect(() => {
        if(sessionId){
            axiosSecure.post('/payment-success', {sessionId})
            
        }
    })
    console.log("Payment successful with session ID:", sessionId);

    return (
        <div>
            <h2 className="text-4xl">Payment successful</h2>
           
        </div>
    );
};

export default PaymentSuccess;