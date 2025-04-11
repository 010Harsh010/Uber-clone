import React from "react";
import {jsPDF} from "jspdf"
import autoTable from 'jspdf-autotable';
import { convertDistance,convertTime } from "../utils/Conversion";

const TransactionCard = (props) => {
  const data = props.trans;

  const createPdf = async() => {
    const pdf = new jsPDF();
    pdf.setFont('Arial', 'monospace', 'normal');
    pdf.setFontSize(22);
    pdf.setTextColor(0, 123, 255);
    pdf.text("Receipt Details", 80, 30);

    const item = data;
    const headers = [
      'Driver Id', 'Driver Email', 'Vehicle No', 'PickUp', 'Destination', 'Fare', 'Status', 'Duration', 'Distance'
    ];
    const heading = [
      ""
    ]
    const distance = convertDistance(data.distance) + " Km";
    const duration = convertTime(data.duration) + " Hrs";
    const body = [
      ["Driver Name" ,data.captain.fullname.firstname + " " + data.captain.fullname.lastname],
      ["Driver Id",data.captain._id],
      ["Vehicle No", data.captain.vehicle.plate],
      ["Driver Email",data.captain.email],
      ["Pickup",data.pickup],
      ["Destination",data.destination],
      ["Fare",data.fare],
      ["Status",data.status],
      ["Duration", duration],
      ["Distance", distance]
    ];

    autoTable(pdf, {
      head: heading,
      theme: "striped",
      body: body,
      columnStyles: {
        0: { halign: 'center', fillColor: [0, 255, 0] },
        1: { halign: 'center' } 
      },
      margin: { top: 10, left: 10, right: 10, bottom: 10 },
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      styles: {
        fontSize: 10, 
        cellPadding: 5 
      },
      tableWidth: 'auto', 
      columnStyles: {
        0: { cellWidth: 'auto' }, 
        1: { cellWidth: 'auto' },
      }
    });

    pdf.save("transaction.pdf");
}

  // const createReceipt = async () => {
  //   const receiptData = await createPdf();

  //   // Generate .txt file content
  //   const fileContent = `Receipt Data:\n${JSON.stringify(receiptData, null, 2)}`;

  //   // Create a Blob from the file content
  //   const blob = new Blob([fileContent], { type: "text/plain" });

  //   // Create a link element
  //   const link = document.createElement("a");

  //   // Set the download attribute with a filename
  //   link.download = "receipt.txt";

  //   // Create a URL for the Blob and set it as the href attribute
  //   link.href = window.URL.createObjectURL(blob);

  //   // Append the link to the body
  //   document.body.appendChild(link);

  //   // Programmatically click the link to trigger the download
  //   link.click();

  //   // Remove the link from the document
  //   document.body.removeChild(link);
  // };
  

  return (
    <div
      key={data.key}
      className="bg-gray-200 shadow-md rounded-lg h-auto m-4 p-4 w-full  mx-auto"
    >
      <div className="h-full flex flex-col md:flex-row">
        {/* Captain Image */}
        <div className="h-20 w-20 flex-shrink-0 mb-4 md:mb-0 md:mr-4 flex justify-center items-center">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1464863979621-258859e62245?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmVtYWxlJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
        </div>
        <div className="flex flex-wrap w-full justify-between">
          <div className="flex flex-col mb-4 md:mb-0 text-sm md:text-base">
            <h3 className="font-semibold">{data?.captain?.fullname?.firstname + " " +data?.captain?.fullname?.lastname}</h3>
            <p className="text-gray-600">{data?.captain?.email}</p>
            <h3 className="font-semibold">{data?.destination}</h3>
            <p className="text-gray-600">{data?.pickup}</p>
          </div>
          <div className="flex flex-col mb-4 md:mb-0 text-sm md:text-base">
            <h3 className="font-semibold">RJ40 AC5085</h3>
            <h3 className="font-semibold">{convertTime(data?.duration)} Hrs</h3>
            <p className="text-gray-600">{convertDistance(data?.distance)} km</p>
          </div>
          <div className="flex flex-col mb-4 md:mb-0 text-sm md:text-base">
            
          </div>
          <div className="flex flex-col text-sm md:text-base">
            
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ml-4">
          <h1 className={`text-2xl font-bold ${data.status !== "pending"?"text-green-500":"text-red-500"}`}>${data.fare}</h1>
          {data.status === "accepted" ? (
            <div className="bg-red-500 text-white p-2 rounded-md text-sm mt-2">
              Pending
            </div>
          ) : (
            <div onClick={() => {
              createPdf();
            }} className="bg-green-500 text-white p-2 rounded-md text-sm mt-2">
              Download
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
