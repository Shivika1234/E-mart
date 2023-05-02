import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const searchQuery = useSearchParams()[0];

    const referenceNum = searchQuery.get("reference");
    return (
        <>
            <h1 textTransform={"uppercase"}>Order Successfull</h1>
            <p>Reference No.{referenceNum}</p>
        </>

    );
};

export default PaymentSuccess;
