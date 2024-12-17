import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { THEME_COLORS, generateInvoiceNumber } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useErcasPayAPI } from "../hooks/useErcasPayAPI"; // Import the custom hook
import { useState } from "react";
import { InvoicePreview } from "./InvoicePreview";

export function Invoice({ baseurl, secretKey }) {
 
  const ref = generateInvoiceNumber();
  const [form, setForm] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    themeColor: THEME_COLORS[0].value,
    amount: 0,
    description: "",
    customerName: "",
    customerEmail: "",
    paymentReference: ref,
    paymentMethods: "card,bank-transfer,ussd", // Example payment method
    currency: "NGN",
  });

  const { initiateTransaction, details, loading, error } = useErcasPayAPI(baseurl, secretKey);

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    await initiateTransaction({
      amount: formData.amount, // $10.00 or equivalent
      paymentReference: formData.paymentReference,
      paymentMethods: formData.paymentMethods,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhoneNumber: "",
      redirectUrl: "",
      description: formData.description,
      currency: formData.currency,
      feeBearer: "customer",
      metadata: {},
    });

    if(!loading){
      setForm(true)
    }
  };

  return (
    <>
    <div className={form? "hidden" : "block"}>
       <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto my-12 p-8 bg-white rounded-xl shadow-sm border border-blue-100"
    >
      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-gray-700">
          Your Company Name
        </Label>
        <Input
          id="companyName"
          required
          value={formData.companyName}
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
          placeholder="Enter your company name"
          className="border-gray-200 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-gray-700">Theme Color</Label>
        <div className="flex gap-3 flex-wrap">
          {THEME_COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              className={cn(
                "w-8 h-8 rounded-full border-2 transition-all",
                formData.themeColor === color.value
                  ? "border-blue-600 dark:border-white scale-110"
                  : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: color.value }}
              onClick={() =>
                setFormData({ ...formData, themeColor: color.value })
              }
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount" className="text-gray-700">
          Amount
        </Label>
        <Input
          id="amount"
          type="number"
          required
          min="0"
          step="0.01"
          value={formData.amount || ""}
          onChange={(e) =>
            setFormData({ ...formData, amount: parseFloat(e.target.value) })
          }
          placeholder="Enter amount"
          className="border-gray-200 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerName" className="text-gray-700">
          Customer Name / Company
        </Label>
        <Input
          id="customerName"
          type="text"
          required
          value={formData.customerName}
          onChange={(e) =>
            setFormData({ ...formData, customerName: e.target.value })
          }
          placeholder="Enter Customer Name"
          className="border-gray-200 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerEmail" className="text-gray-700">
          Customer Email
        </Label>
        <Input
          id="customerEmail"
          type="email"
          required
          value={formData.customerEmail}
          onChange={(e) =>
            setFormData({ ...formData, customerEmail: e.target.value })
          }
          placeholder="Enter Customer Email"
          className="border-gray-200 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-700">
          Description
        </Label>
        <Textarea
          id="description"
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter invoice description"
          className="min-h-[100px] border-gray-200 focus:border-blue-500"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Invoice"}
      </Button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      
    </form>
    </div>
   
   <div className={form? "block" : "hidden"}>
    <InvoicePreview data={formData} details={details}/>
   </div>
    
    </>
    
  );
}
