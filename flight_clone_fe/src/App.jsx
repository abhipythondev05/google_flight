import React from "react";
import Header from "./Header";
import FlightSearch from "./FlightSearch";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./About";
import BookingForm from "./BookingForm";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<FlightSearch />} />
        <Route path="/booking" element={<BookingForm />} />
      </Routes>
      <About />
    </div>
  );
};

export default App;
