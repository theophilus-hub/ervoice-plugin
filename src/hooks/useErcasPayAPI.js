import { useState } from "react";


export const useErcasPayAPI = (BASE_URL, SECRET_KEY) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiateTransaction = async ({
    amount,
    paymentReference,
    paymentMethods,
    customerName,
    customerEmail,
    customerPhoneNumber,
    redirectUrl,
    description,
    currency = "USD", // Default to USD if not provided
    feeBearer = "customer", // Default to customer
    metadata = {},
  }) => {
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!amount || !paymentReference || !paymentMethods || !customerName || !customerEmail) {
      setError("All required fields must be filled.");
      setLoading(false);
      return;
    }

    try {
      const raw = JSON.stringify({
        amount,
        paymentReference,
        paymentMethods,
        customerName,
        customerEmail,
        customerPhoneNumber,
        redirectUrl,
        description,
        currency,
        feeBearer,
        metadata,
      });

      const response = await fetch(`${BASE_URL}/payment/initiate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET_KEY}`,
        },
        body: raw,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData?.message || "Transaction initiation failed");
      }

      const data = await response.json();
      if (data?.responseBody) {

        setDetails(data.responseBody);
      } else {
        throw new Error("No payment link returned from API");
      }
    } catch (err) {
      setError(err.message || "An error occurred while initiating the transaction.");
    } finally {
      setLoading(false);
    }
  };

  return {
    initiateTransaction,
    details,
    loading,
    error,
  };
};

export default useErcasPayAPI;
