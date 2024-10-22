import React, { useState } from "react";
import "./FlightSearch.css";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Typography,
  Snackbar,
  Popover,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import FlightResults from "./FlightResults";
import Shimer from "./Shimer";
import Skeleton from "@mui/material/Skeleton";

const FlightSearch = () => {
  const [passenger, setPassenger] = useState(1);
  const [tripType, setTripType] = useState("one-way");
  const [classType, setClassType] = useState("economy");
  const [origin, setOrigin] = useState("");
  const [originSkyId, setOriginSkyId] = useState("");
  const [originEntityId, setOriginEntityId] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationSkyId, setDestinationSkyId] = useState("");
  const [destinationEntityId, setDestinationEntityId] = useState("");
  const [Flights, setFlights] = useState([]);
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions2, setSuggestions2] = useState([]);
  const [showSuggestions2, setShowSuggestions2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbar2, setOpenSnackbar2] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infantsSeat, setInfantsSeat] = useState(0);
  const [infantsLap, setInfantsLap] = useState(0);

  const open = Boolean(anchorEl);
  const id = open ? "passenger-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIncrement = (setCount, count) => {
    setCount(count + 1);
  };

  const handleDecrement = (setCount, count) => {
    if (count > 0) setCount(count - 1);
  };

  const handleDone = () => {
    const totalPassengers = `${adults} Adult${
      adults > 1 ? "s" : ""
    }, ${children} Child${children > 1 ? "ren" : ""}, ${
      infantsSeat + infantsLap
    } Infant${infantsSeat + infantsLap !== 1 ? "s" : ""}`;
    setPassenger(adults + children + infantsSeat + infantsLap);
    handleClose();
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/flights/search/",
        {
          params: {
            originSkyId: originSkyId,
            destinationSkyId: destinationSkyId,
            originEntityId: originEntityId,
            destinationEntityId: destinationEntityId,
            cabinClass: classType,
            adults: passenger,
            sortBy: "best",
            currency: "INR",
            market: "en-US",
            countryCode: "IND",
            date: date,
            returnDate: null || date2,
          },
        }
      );
      console.log(response?.data?.data?.itineraries);
      setLoading(false);
      setFlights(response?.data?.data?.itineraries); // Update state with flight data
    } catch (err) {
      setOpenSnackbar(true);
    }
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);

    const temp1 = originSkyId;
    setOriginSkyId(destinationSkyId);
    setDestinationSkyId(temp1);

    const temp2 = originEntityId;
    setOriginEntityId(destinationEntityId);
    setDestinationEntityId(temp2);
  };

  const fetchAirportSuggestions = async (query) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/airports/search/",
        {
          params: {
            query: query,
          },
        }
      );
      setSuggestions(response?.data?.data);
      setShowSuggestions(true);
    } catch (err) {
      setOpenSnackbar2(true);
    }
  };

  const fetchAirportSuggestions2 = async (query) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/airports/search/",
        {
          params: {
            query: query,
          },
        }
      );
      setSuggestions2(response?.data?.data);
      setShowSuggestions2(true);
    } catch (err) {
      setOpenSnackbar2(true);
    }
  };

  function handleSuggestionClick(suggestion) {
    setOrigin(suggestion?.presentation?.suggestionTitle);
    setOriginSkyId(suggestion?.navigation?.relevantFlightParams?.skyId);
    setOriginEntityId(suggestion?.navigation?.relevantFlightParams?.entityId);
    setShowSuggestions(false);
  }

  const handleSuggestionClick2 = (suggestion) => {
    setDestination(suggestion?.presentation?.suggestionTitle);
    setDestinationSkyId(suggestion?.navigation?.relevantFlightParams?.skyId);
    setDestinationEntityId(
      suggestion?.navigation?.relevantFlightParams?.entityId
    );
    setShowSuggestions2(false);
  };

  return (
    <>
      <div className="relative">
        <img
          src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg"
          alt="image"
          className="image-class"
        />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white text-2xl lg:text-5xl md:text-4xl sm:text-3xl font-bold mb-4">
          Flights
        </div>
      </div>

      <Box className="flex flex-col pt-8 justify-center items-center bg-[#333] p-2 rounded-md my-5 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48 h-[300px] lg:h-[140px] md:h-[136px] sm:h-[182px]">
        <Box
          sx={{
            display: "flex",
            paddingBottom: 2,
            borderRadius: 2,
          }}
        >
          <FormControl variant="standard" sx={{ mr: 2, minWidth: 100 }}>
            <Select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              sx={{ color: "#f8f9f9" }}
            >
              <MenuItem value="one-way" sx={{ color: "#f8f9f9" }}>
                One way
              </MenuItem>
              <MenuItem value="round-trip" sx={{ color: "#f8f9f9" }}>
                Round trip
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ mr: 2, minWidth: 100 }}>
            <Select
              value={passenger}
              onClick={handleClick}
              startIcon={<PersonIcon />}
              sx={{ color: "#f8f9f9" }}
            >
              <MenuItem value={passenger} sx={{ color: "#f8f9f9" }}>
                <PersonIcon /> {passenger}
              </MenuItem>
            </Select>
          </FormControl>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box padding={2} width="250px" sx={{ backgroundColor: "#333" }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ color: "#f8f9f9" }}
              >
                <Typography>Adults</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => handleDecrement(setAdults, adults)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{adults}</Typography>
                  <IconButton
                    onClick={() => handleIncrement(setAdults, adults)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ color: "#f8f9f9" }}
              >
                <Typography>Children (2-11)</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => handleDecrement(setChildren, children)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{children}</Typography>
                  <IconButton
                    onClick={() => handleIncrement(setChildren, children)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ color: "#f8f9f9" }}
              >
                <Typography>Infants (In seat)</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => handleDecrement(setInfantsSeat, infantsSeat)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{infantsSeat}</Typography>
                  <IconButton
                    onClick={() => handleIncrement(setInfantsSeat, infantsSeat)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ color: "#f8f9f9" }}
              >
                <Typography>Infants (On lap)</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => handleDecrement(setInfantsLap, infantsLap)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{infantsLap}</Typography>
                  <IconButton
                    onClick={() => handleIncrement(setInfantsLap, infantsLap)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button onClick={handleClose} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleDone}>
                  Done
                </Button>
              </Box>
            </Box>
          </Popover>

          <FormControl variant="standard" sx={{ mr: 2, minWidth: 100 }}>
            <Select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              sx={{ color: "#f8f9f9" }}
            >
              <MenuItem value="economy" sx={{ color: "#f8f9f9" }}>
                Economy
              </MenuItem>
              <MenuItem value="premium economy" sx={{ color: "#f8f9f9" }}>
                Premium Economy
              </MenuItem>
              <MenuItem value="business" sx={{ color: "#f8f9f9" }}>
                Business
              </MenuItem>
              <MenuItem value="first class" sx={{ color: "#f8f9f9" }}>
                First Class
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className="flex flex-wrap md:flex-nowrap items-center">
          {/* Origin Input */}
          <div className="relative flex mr-2 lg:w-[230px] items-center border border-gray-400 rounded-md flex-grow lg:flex-none mt-2 md:mt-0 sm:mt-0">
            <span className="flex items-center pl-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-white" />
            </span>
            <input
              type="text"
              className="w-full p-2 text-white bg-[#333] border-none rounded-md focus:outline-none"
              placeholder="Where From?"
              value={origin}
              onChange={(e) => {
                setOrigin(e.target.value);
                fetchAirportSuggestions(e.target.value);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-20 bg-gray-800 border border-gray-300 rounded-md max-h-60 overflow-auto text-white w-full top-12">
                <ul className="list-none pl-0">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.entityId}
                      className="p-2 hover:bg-gray-500 cursor-pointer"
                      onMouseDown={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="font-bold">
                        {suggestion.presentation.suggestionTitle}
                      </div>
                      <div className="text-sm text-slate-50">
                        {suggestion.presentation.subtitle}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Swap Locations */}
          <span
            className="flex items-center cursor-pointer mt-2 sm:mt-0"
            onClick={swapLocations}
          >
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              className="text-white"
            />
          </span>

          {/* Destination Input */}
          <div className="relative flex mx-2 lg:w-[230px] items-center border border-gray-400 rounded-md flex-grow lg:flex-none mt-2 sm:mt-0">
            <span className="flex items-center pl-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-white" />
            </span>
            <input
              type="text"
              className="w-full p-2 text-white bg-[#333] border-none rounded-md focus:outline-none"
              placeholder="Where To?"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                fetchAirportSuggestions2(e.target.value);
              }}
              onFocus={() => setShowSuggestions2(true)}
              onBlur={() => setShowSuggestions2(false)}
            />
            {showSuggestions2 && suggestions2.length > 0 && (
              <div className="absolute z-20 bg-gray-800 border border-gray-300 rounded-md max-h-60 overflow-auto text-white w-full top-12">
                <ul className="list-none pl-0">
                  {suggestions2.map((suggestion) => (
                    <li
                      key={suggestion.entityId}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onMouseDown={() => handleSuggestionClick2(suggestion)}
                    >
                      <div className="font-bold">
                        {suggestion.presentation.suggestionTitle}
                      </div>
                      <div className="text-sm text-gray-500">
                        {suggestion.presentation.subtitle}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Departure Date Input */}
          <div className="mr-2 lg:w-[135px] flex-grow lg:flex-none mt-2 md:mt-0">
            <input
              type="date"
              className="w-full p-2 border border-gray-400 rounded-md text-white bg-[#333]"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Return Date (only for round-trip) */}
          {tripType === "round-trip" && (
            <div className="mr-2 lg:w-[135px] flex-grow lg:flex-none mt-2 md:mt-0">
              <input
                type="date"
                className="w-full p-2 border border-gray-400 rounded-md text-white bg-[#333]"
                onChange={(e) => setDate2(e.target.value)}
              />
            </div>
          )}
        </div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            width: "100%",
            borderRadius: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#9dbff9",
              color: "black",
              fontWeight: "bold",
              borderRadius: 20,
              paddingX: 5,
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Box>

      {loading ? (
        <>
          <div className="mb-5 mt-12 sm:mx-40 md:mx-56 lg:mx-68 xl:mx-76">
            <Skeleton
              variant="rectangular"
              height={30}
              sx={{ bgcolor: "gray.600" }}
            />
          </div>
          {[...Array(8)].map(() => (
            <Shimer />
          ))}{" "}
        </>
      ) : (
        Flights.length > 0 && (
          <div className="my-1 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-48">
            <h1 className="text-2xl font-bold text-center my-1">
              Flight Search Results
            </h1>
            <FlightResults itineraries={Flights} />
          </div>
        )
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%", marginTop: "50px" }}
        >
          Failed to fetch Flight data.!!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackbar2}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar2(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%", marginTop: "50px" }}
        >
          Failed to fetch Airport Location!!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FlightSearch;
