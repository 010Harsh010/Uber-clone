import React from "react";
import axios from "axios"
function LocationSearchPanel(props) {
  const location = [
    "B2 Wide Street,New York, NY , Grater America",
    "B2 Wide Street,New York, NY , Grater America",
    "B2 Wide Street,New York, NY , Grater America",
    "B2 Wide Street,New York, NY , Grater America",
  ];
  const [locationList, setLocationList] = React.useState([]);
  const fetchList = async () => {
    try {
        if (props.active) {
          const address = props.pickup;
          if (address.length<6){
            return;
          }
          console.log("trying in Pickup");
          const response = await axios.get(
            "http://localhost:4000/maps/suggestion",
            {
              params: {
                input: address,
              },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = response.data;
          setLocationList(data);
        } else {
          const address = props.destination;
          if (address.length<6){
            return;
          }
          console.log("trying in Destination");
          const response = await axios.get(
            "http://localhost:4000/maps/suggestion",
            {
              params: {
                input: address,
              },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = response.data;
          setLocationList(data);
        }
    } catch (error) {
        console.log(error);
    }
  };
  React.useEffect(() => {
    fetchList();
  },[props.pickup,props.destination]);
  return (
    <div>
      {locationList.map((item, index) => {
        return (
          <div
            onClick={() => {
              if (props.active) {
                props.setpickup(item.description);
              } else {
                props.setdestination(item.description);
              }
            }}
            key={index}
            className="gap-4 border-2 p-3 pl-2 border-gray-50 active:border-black rounded-xl  my-2 flex justify-start items-center"
          >
            <h2 className="bg-[#eee] flex items-center  justify-center h-10 w-10 rounded-full">
              <i className="text-xl ri-map-pin-line"></i>
            </h2>
            <h4 className="font-medium">{item.description}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default LocationSearchPanel;
