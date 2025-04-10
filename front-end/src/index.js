import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Move Router here
import "./index.css";
import App from "./master";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import UserState from "./Context/User/UserState";
import CategoryState from "./Context/Category/CategoryState";
import ServiceState from "./Context/Service/ServiceState";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from "react-redux";
import store from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <UserState>
          <ServiceState>
            <CategoryState>
              <App />
            </CategoryState>
          </ServiceState>
        </UserState>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
