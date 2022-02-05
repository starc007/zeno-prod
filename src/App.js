import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Public/Home";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Private/Dashboard";
import Payment from "./pages/Private/Payment";
import Transaction from "./pages/Private/Transaction";
import Account from "./pages/Private/Account";
import PaymentStatus from "./components/PaymentStatus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="transactions/history"
            element={
              <PrivateRoute>
                <Transaction />
              </PrivateRoute>
            }
          />
          <Route
            path="account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="payment/status/:paymentId"
            element={
              <PrivateRoute>
                <PaymentStatus />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
