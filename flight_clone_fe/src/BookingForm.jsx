import React from "react";
import { useSelector } from "react-redux";

const BookingForm = () => {
  const flight = useSelector((store) => store.flight.flightDetails);

  const leg = flight[0]?.legs[0];
  const segment = leg?.segments[0];

  return (
    <>
      <h1 className="text-4xl text-center p-6">Flight Details</h1>
      <div className="flight-details bg-gray-900 text-white p-6 my-5 mb-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48 rounded-md">
        <div className="flight-header flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {leg.origin.city} ({leg.origin.displayCode}) →{" "}
            {leg.destination.city} ({leg.destination.displayCode})
          </h1>
          <div className="price text-3xl font-semibold">
            {flight[0].price.formatted}
          </div>
        </div>

        {/* Selected Flight Information */}
        <div className="selected-flight bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-lg font-semibold">Departure:</p>
              <p>{new Date(leg.departure).toLocaleString()}</p>
              <p>
                {leg.origin.name} ({leg.origin.displayCode}) - {leg.origin.city}
                , {leg.origin.country}
              </p>
            </div>

            <div>
              <p className="text-lg font-semibold">Arrival:</p>
              <p>{new Date(leg.arrival).toLocaleString()}</p>
              <p>
                {leg.destination.name} ({leg.destination.displayCode}) -{" "}
                {leg.destination.city}, {leg.destination.country}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Flight Duration:</p>
              <p>
                {Math.floor(leg.durationInMinutes / 60)}h{" "}
                {leg.durationInMinutes % 60}m
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Stops:</p>
              <p>
                {leg.stopCount === 0 ? "Non-stop" : `${leg.stopCount} stop(s)`}
              </p>
            </div>
          </div>
        </div>

        {/* Carrier Information */}
        <div className="carrier-info flex items-center bg-gray-800 p-4 rounded-lg mb-6">
          <img
            src={leg.carriers.marketing[0].logoUrl}
            alt={leg.carriers.marketing[0].name}
            className="w-10 h-10 mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {leg.carriers.marketing[0].name}
            </h3>
            <p>Flight Number: {segment.flightNumber}</p>
          </div>
        </div>

        {/* Fare Policy */}
        <div className="fare-policy bg-gray-800 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-2">Fare Policies</h2>
          <ul>
            <li>
              {flight[0].farePolicy.isChangeAllowed
                ? "Change Allowed"
                : "No Changes Allowed"}
            </li>
            <li>
              {flight[0].farePolicy.isCancellationAllowed
                ? "Cancellation Allowed"
                : "No Cancellation Allowed"}
            </li>
            <li>
              {flight[0].farePolicy.isPartiallyRefundable
                ? "Partially Refundable"
                : "Non-Refundable"}
            </li>
          </ul>
        </div>

        {/* Booking Options */}
        <div className="booking-options bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Booking Options</h2>
          <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center">
              <img
                src="https://logos.skyscnr.com/images/airlines/favicon/AI.png"
                alt="Air India"
                className="w-12 h-12 mr-4"
              />
              <div>
                <h3 className="font-semibold">Book with Air India</h3>
                <p>Direct Booking</p>
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold">
                {flight[0].price.formatted}
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
