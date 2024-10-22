import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { flightSelected } from "./utils/flightSlice";

const FlightResults = ({ itineraries }) => {
  const dispatch = useDispatch();

  const handleClick = (flight) => {
    dispatch(flightSelected(flight));
  };

  return (
    <div className="flight-list">
      {itineraries.map((flight, index) => (
        <Link
          to={{
            pathname: "/booking",
            state: { flight: flight }, // Passing flight data to booking page
          }}
          key={flight.id}
        >
          <div
            key={flight.id}
            className="flight-card border p-4 m-2 rounded-lg shadow-lg bg-gray-800 text-white"
            onClick={() => handleClick(flight)}
          >
            {/* Flight Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold">
                {flight.legs[0].origin.city} (
                {flight.legs[0].origin.displayCode}) →{" "}
                {flight.legs[0].destination.city} (
                {flight.legs[0].destination.displayCode})
              </h2>

              <div className="text-base font-semibold">
                {flight.price.formatted}
              </div>
            </div>

            {/* Flight Details */}
            <div className="flight-info">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm">
                    Departure:{" "}
                    {new Date(flight.legs[0].departure).toLocaleString()}
                  </span>
                  <span className="text-sm">
                    {" "}
                    Arrival: {new Date(flight.legs[0].arrival).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-sm">
                    Duration:{" "}
                    {Math.floor(flight.legs[0].durationInMinutes / 60)}h{" "}
                    {flight.legs[0].durationInMinutes % 60}m
                  </span>
                  <span className="text-sm"> Non-stop flight</span>
                </div>
              </div>

              {/* Carrier Details */}
              <div className="carrier-info flex items-center">
                <img
                  src={flight.legs[0].carriers.marketing[0].logoUrl}
                  alt={flight.legs[0].carriers.marketing[0].name}
                  className="w-8 h-8 mr-2 rounded-lg"
                />
                <span>{flight.legs[0].carriers.marketing[0].name}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FlightResults;
