import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Ensure you're using the correct key for the token

    if (!token) {
      navigate("/login");
    } else {
      axios
        .post(
          "http://localhost:4000/logout",
          {}, // POST body, if any (empty object here)
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem("authToken");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Unable to Logout:", error.message);
          navigate("/home");
        });
    }
  }, [navigate]);

  return <div>LOGGING OUT !!!</div>;
}

export default UserLogout;
