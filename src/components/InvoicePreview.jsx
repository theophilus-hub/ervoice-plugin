import { generateInvoiceNumber } from "@/lib/constants";
import { Button } from "./ui/button";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

export function InvoicePreview({ data, onBack, details }) {
  // Reference to capture the invoice content for PDF export
  const invoiceRef = useRef(null);

  // Generate an invoice number and current date

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    if (invoiceRef.current) {
      const opt = {
        margin: 1,
        filename: `invoice-${data?.paymentReference}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Generate the PDF from the invoice content
      html2pdf().set(opt).from(invoiceRef.current).save();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      {/* Invoice container */}
      <div
        ref={invoiceRef}
        className="bg-white rounded-xl shadow-lg p-8 border border-blue-100"
      >
        {/* Invoice color bar at the top */}
        <div
          className="h-2 w-full rounded-t-xl mb-8"
          style={{ backgroundColor: data.themeColor }}
        />

        {/* Invoice Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: data.themeColor }}
            >
              {data.companyName}
            </h1>
            <p className="text-gray-600 mt-2">
              Invoice #{data?.paymentReference}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Date</p>
            <p className="font-medium text-gray-900">{currentDate}</p>
          </div>
        </div>

        {/* Description Section */}
        <div className="border-t border-gray-200 py-4 ">
          <div className="mb-4">
            <h2 className="text-sm text-gray-600 uppercase font-medium">TO:</h2>
            <p className="mt-2 text-lg text-gray-900">{data?.customerName}</p>
            <p className=" text-sm text-gray-900">{data?.customerEmail}</p>
          </div>
        </div>

        {/* Description Section */}
        <div className=" border-b border-gray-200 py-6">
          <div className="mb-4">
            <h2 className="text-sm text-gray-600 uppercase font-medium">
              Description
            </h2>
            <p className="mt-2 text-lg text-gray-900">{data.description}</p>
          </div>
        </div>

        {/* Total Amount Section */}
        <div className="flex justify-end mb-8 mt-2">
          <div className="text-right ">
            <p className="text-sm text-gray-600 uppercase mb-2 font-medium">
              Total Amount
            </p>
            <p
              className="text-4xl font-bold"
              style={{ color: data.themeColor }}
            >
              ${data.amount.toFixed(2)}
            </p>
            <a href={details?.checkoutUrl}>
              <Button
              type="submit"
              className="w-[80%] mt-6 py-3 bg-blue-600 hover:bg-blue-700"
            >
              Pay Now
            </Button>
            </a>
            
          </div>
        </div>
      </div>

      {/* Action Buttons: Back to Form and Download PDF */}
      <div className="flex justify-between items-center mt-8">
        <a href="/invoice">
          <Button variant="outline" onClick={onBack} className="px-6">
            Back to Form
          </Button>
        </a>

        <Button
          onClick={handleDownloadPDF}
          className="px-6"
          style={{
            backgroundColor: data.themeColor,
          }}
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
}
