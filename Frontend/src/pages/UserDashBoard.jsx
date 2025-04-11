import React, { useState, useEffect } from "react";
import TransactionCard from "../components/TransactionCard";
import axios from "axios";
import { useSelector } from "react-redux";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

const UserDashBoard = () => {
  // const data=[
  //     {
  //       "_id": "ride1",
  //       "user": "user1",
  //       "captain": { "_id": "captain1", "name": "John Doe", "email": "johndoe@example.com" },
  //       "pickup": "iiits, Gnan Marg, Sri City",
  //       "destination": "Bangalore International Airport",
  //       "fare": 3000,
  //       "status": "completed",
  //       "duration": 14400,
  //       "distance": 250000,
  //       "otp": "123456",
  //       "createdAt": "2025-01-15T08:00:00.000Z",
  //       "updatedAt": "2025-01-15T08:40:00.000Z"
  //     },
  //     {
  //       "_id": "ride2",
  //       "user": "user2",
  //       "captain": { "_id": "captain2", "name": "Alice Johnson", "email": "alicej@example.com" },
  //       "pickup": "Hyderabad City Center",
  //       "destination": "Chennai Central Station",
  //       "fare": 4500,
  //       "status": "completed",
  //       "duration": 18000,
  //       "distance": 550000,
  //       "otp": "234567",
  //       "createdAt": "2025-01-15T09:00:00.000Z",
  //       "updatedAt": "2025-01-15T09:50:00.000Z"
  //     },
  //     {
  //       "_id": "ride3",
  //       "user": "user3",
  //       "captain": { "_id": "captain3", "name": "Robert Smith", "email": "roberts@example.com" },
  //       "pickup": "Chennai Airport",
  //       "destination": "Pondicherry Beach",
  //       "fare": 1500,
  //       "status": "completed",
  //       "duration": 7200,
  //       "distance": 150000,
  //       "otp": "345678",
  //       "createdAt": "2025-01-15T10:00:00.000Z",
  //       "updatedAt": "2025-01-15T10:30:00.000Z"
  //     },
  //     {
  //       "_id": "ride4",
  //       "user": "user4",
  //       "captain": { "_id": "captain4", "name": "David Lee", "email": "davidl@example.com" },
  //       "pickup": "Delhi Cantt",
  //       "destination": "India Gate",
  //       "fare": 500,
  //       "status": "completed",
  //       "duration": 1800,
  //       "distance": 5000,
  //       "otp": "456789",
  //       "createdAt": "2025-01-15T11:00:00.000Z",
  //       "updatedAt": "2025-01-15T11:15:00.000Z"
  //     },
  //     {
  //       "_id": "ride5",
  //       "user": "user5",
  //       "captain": { "_id": "captain5", "name": "Sophia Brown", "email": "sophiab@example.com" },
  //       "pickup": "Mumbai CST",
  //       "destination": "Pune Station",
  //       "fare": 2000,
  //       "status": "completed",
  //       "duration": 14400,
  //       "distance": 150000,
  //       "otp": "567890",
  //       "createdAt": "2025-01-15T12:00:00.000Z",
  //       "updatedAt": "2025-01-15T12:45:00.000Z"
  //     },
  //     {
  //       "_id": "ride6",
  //       "user": "user6",
  //       "captain": { "_id": "captain6", "name": "Emma Davis", "email": "emmad@example.com" },
  //       "pickup": "Kolkata Howrah Station",
  //       "destination": "Salt Lake City",
  //       "fare": 300,
  //       "status": "completed",
  //       "duration": 1800,
  //       "distance": 12000,
  //       "otp": "678901",
  //       "createdAt": "2025-01-15T13:00:00.000Z",
  //       "updatedAt": "2025-01-15T13:15:00.000Z"
  //     },
  //     {
  //       "_id": "ride7",
  //       "user": "user7",
  //       "captain": { "_id": "captain7", "name": "Michael Wilson", "email": "michaelw@example.com" },
  //       "pickup": "Jaipur City Center",
  //       "destination": "Amer Fort",
  //       "fare": 700,
  //       "status": "completed",
  //       "duration": 3600,
  //       "distance": 25000,
  //       "otp": "789012",
  //       "createdAt": "2025-01-15T14:00:00.000Z",
  //       "updatedAt": "2025-01-15T14:25:00.000Z"
  //     },
  //     {
  //       "_id": "ride8",
  //       "user": "user8",
  //       "captain": { "_id": "captain8", "name": "Olivia Martinez", "email": "oliviam@example.com" },
  //       "pickup": "Lucknow Railway Station",
  //       "destination": "Hazratganj",
  //       "fare": 500,
  //       "status": "completed",
  //       "duration": 1800,
  //       "distance": 10000,
  //       "otp": "890123",
  //       "createdAt": "2025-01-15T15:00:00.000Z",
  //       "updatedAt": "2025-01-15T15:20:00.000Z"
  //     },
  //     {
  //       "_id": "ride9",
  //       "user": "user9",
  //       "captain": { "_id": "captain9", "name": "Isabella Clark", "email": "isabellac@example.com" },
  //       "pickup": "Ahmedabad Junction",
  //       "destination": "Gandhinagar",
  //       "fare": 800,
  //       "status": "completed",
  //       "duration": 3600,
  //       "distance": 35000,
  //       "otp": "901234",
  //       "createdAt": "2025-01-15T16:00:00.000Z",
  //       "updatedAt": "2025-01-15T16:40:00.000Z"
  //     },
  //     {
  //       "_id": "ride10",
  //       "user": "user10",
  //       "captain": { "_id": "captain10", "name": "Ethan Walker", "email": "ethanw@example.com" },
  //       "pickup": "Pune City Center",
  //       "destination": "Lonavala",
  //       "fare": 1500,
  //       "status": "completed",
  //       "duration": 7200,
  //       "distance": 75000,
  //       "otp": "012345",
  //       "createdAt": "2025-01-15T17:00:00.000Z",
  //       "updatedAt": "2025-01-15T17:50:00.000Z"
  //     }
  //     // Add similar data for rides 11 to 20 with different captains, users, and locations.
  //   ]
  const user = useSelector((state) => state.user.currentUser);

  const [data, setdata] = useState([]);
  const fetchdetails = async () => {
    const response = await axios.get("http://localhost:4000/user/getdetails", {
      withCredentials: true,
    });
    setdata(response.data);
  };
  useEffect(() => {
    fetchdetails();
  }, []);

  const getallTranscation = async () => {
    const doc = new jsPDF({
      orientation: "landscape", // Corrected the orientation
      unit: "px",
    });
    // Define table headers
    const headers = [
      "Driver Id",
      "Driver Email",
      "Vehicle No",
      "PickUp",
      "Destination",
      "Fare",
      "Status",
      "Duration",
      "Distance",
    ];

    // Prepare data for the body of the table
    const body = data
      .filter(
        (item) => item.status === "completed" || item.status === "accepted"
      )
      .map((item) => [
        item.captain._id,
        item.captain.email,
        item.plate,
        item.pickup,
        item.destination,
        item.fare,
        item.status,
        item.duration,
        item.distance,
      ]);

    // Create the table using autoTable
    autoTable(doc, {
      head: [headers],
      body: body,
      theme: "striped",
      columnStyles: {
        0: { halign: "center", fillColor: [0, 255, 0] },
        1: { halign: "center" },
        2: { halign: "center" },
        3: { halign: "center" },
        4: { halign: "center" },
        5: { halign: "center" },
        6: { halign: "center" },
        7: { halign: "center" },
        8: { halign: "center" },
      },
      margin: { top: 10, left: 10, right: 10, bottom: 10 },
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      styles: {
        fontSize: 10, // Reduce font size to fit the text better
        cellPadding: 5, // Add padding to cells for better readability
      },
      tableWidth: "auto", // Ensure table width adjusts to content
      columnStyles: {
        0: { cellWidth: "auto" }, // Auto width for the first column
        1: { cellWidth: "auto" }, // Auto width for the second column
        2: { cellWidth: "auto" }, // Auto width for the third column
        3: { cellWidth: "auto" }, // Auto width for the fourth column
        4: { cellWidth: "auto" }, // Auto width for the fifth column
        5: { cellWidth: "auto" }, // Auto width for the sixth column
        6: { cellWidth: "auto" }, // Auto width for the seventh column
        7: { cellWidth: "auto" }, // Auto width for the eighth column
        8: { cellWidth: "auto" }, // Auto width for the ninth column
      },
    });

    // Save the PDF
    doc.save("UserTranscation.pdf");
  };

  return (
    <div className="h-screen w-screen bg-gray-300 ">
      <div className="h-[40%] bg-white ">
        <div className="h-[65%]">
          <img
            className="object-cover h-full w-full "
            src="https://marketplace.canva.com/EAFvvOPc5Y8/1/0/800w/canva-blue-and-white-sky-animation-simple-dream-quote-facebook-cover-pPiGHZ3vmOg.jpg"
            alt=""
          />
        </div>
        <div className="h-[35%] flex flex-row bg-gray-300 w-full">
          <div className="h-full  w-[30%] p-3  flex justify-center">
            <img
              className="h-32 w-32 -mt-12 rounded-full "
              src="https://photosqn.com/wp-content/uploads/2024/04/real-girl-pic-photo-images66.webp"
              alt=""
            />
          </div>
          <div className="h-full w-full flex flex-row p-4">
            <div className="justify-items-end right-0 w-full">
              <h1 className="text-3xl font-semibold">
                {user?.firstname + " " + user?.lastname}
              </h1>
              <h3 className="text-xl">Age 19</h3>
              <div>
                <h2 className="text-xl">
                  Contact no. <span>7240324397</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 mt-4 pt-10 h-[60%] overflow-scroll overflow-x-hidden w-full">
        <div className=" ml-3 mr-3 bg-gray-500 p-2 flex justify-center align-middle w-50%">
          <button
            onClick={() => {
              getallTranscation();
            }}
            className="bg-gray-500 h-full w-50%"
          >
            Download all
          </button>
        </div>
        {data.map((trans, index) => {
          if (trans.status === "accepted" || trans.status === "completed") {
            return <TransactionCard trans={trans} key={index} />;
          }
        })}
      </div>
    </div>
  );
};

export default UserDashBoard;
