import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js"; // Now importing from ES module
import SocketProvider from "./context/SocketContext.jsx";
import SidebarProvider from "./context/SidebarContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SidebarProvider>
      <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketProvider>
    </SidebarProvider>
  </Provider>
);
