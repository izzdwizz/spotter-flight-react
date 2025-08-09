import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  Grid,
  Paper,
  Chip,
  InputAdornment,
  TextField,
  Menu,
} from "@mui/material";
import {
  KeyboardArrowDown,
  Person,
  FlightTakeoff,
  FlightLand,
  CalendarToday,
  SwapHoriz,
} from "@mui/icons-material";
import PassengerSelector from "./PassengerSelector";
import DatePicker from "./DatePicker";
import AirportSearchDropdown from "./AirportSearchDropdown";
import { useFlyContext } from "../context/FlightContext";
import BespokeToast from "./CustomToast/BespokeToast";
import { toast } from "react-toastify";
import {
  saveFlightSearchData,
  generateSessionId,
} from "../utils/cookieManager";

const EditableSearchSummary = ({ searchData, onSearchUpdate }) => {
  const navigate = useNavigate();
  const {
    searchFlights,
    setOrigin: setContextOrigin,
    setDestination: setContextDestination,
    setDepartureDate: setContextDepartureDate,
  } = useFlyContext();

  // Initialize states with existing search data
  const [tripType, setTripType] = useState(
    searchData?.tripType || "Round trip"
  );
  const [passengers, setPassengers] = useState(
    searchData?.passengers?.total || 1
  );
  const [passengerDetails, setPassengerDetails] = useState(
    searchData?.passengers || {
      adults: 1,
      children: 0,
      infantsInSeat: 0,
      infantsOnLap: 0,
    }
  );
  const [travelClass, setTravelClass] = useState(
    searchData?.travelClass || "Economy"
  );
  const [origin, setOrigin] = useState(searchData?.origin?.name || "");
  const [originAirport, setOriginAirport] = useState(
    searchData?.origin || null
  );
  const [destination, setDestination] = useState(
    searchData?.destination?.name || ""
  );
  const [destinationAirport, setDestinationAirport] = useState(
    searchData?.destination || null
  );
  const [departureDate, setDepartureDate] = useState(
    searchData?.departureDate || ""
  );
  const [returnDate, setReturnDate] = useState(searchData?.returnDate || "");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerType, setDatePickerType] = useState("departure");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [anchorEl, setAnchorEl] = useState({
    tripType: null,
    travelClass: null,
  });

  const [showPassengerSelector, setShowPassengerSelector] = useState(false);

  // Update context when origin/destination changes
  useEffect(() => {
    if (originAirport) {
      setContextOrigin(originAirport);
    }
  }, [originAirport, setContextOrigin]);

  useEffect(() => {
    if (destinationAirport) {
      setContextDestination(destinationAirport);
    }
  }, [destinationAirport, setContextDestination]);

  useEffect(() => {
    if (departureDate) {
      setContextDepartureDate(departureDate);
    }
  }, [departureDate, setContextDepartureDate]);

  // Options for dropdowns
  const typeOptions = ["Round trip", "One way", "Multi-city"];
  const travelClassOptions = [
    "Economy",
    "Premium Economy",
    "Business",
    "First",
  ];

  const handleMenuOpen = (field, event) => {
    setAnchorEl((prev) => ({
      ...prev,
      [field]: event.currentTarget,
    }));
  };

  const handleMenuClose = (field) => {
    setAnchorEl((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const handleMenuSelect = (field, value) => {
    if (field === "tripType") {
      setTripType(value);
    } else if (field === "travelClass") {
      setTravelClass(value);
    }
    handleMenuClose(field);
  };

  const handleOriginSelect = (airport) => {
    setOrigin(airport.name);
    setOriginAirport(airport);
  };

  const handleDestinationSelect = (airport) => {
    setDestination(airport.name);
    setDestinationAirport(airport);
  };

  const handleSwapLocations = () => {
    const tempOrigin = origin;
    const tempOriginAirport = originAirport;
    setOrigin(destination);
    setOriginAirport(destinationAirport);
    setDestination(tempOrigin);
    setDestinationAirport(tempOriginAirport);
  };

  const handleDatePickerOpen = (type) => {
    setDatePickerType(type);
    setShowDatePicker(true);
  };

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
  };

  const handleDateSelect = (dateObj) => {
    if (dateObj.departureDate !== undefined) {
      setDepartureDate(dateObj.departureDate);
    }
    if (dateObj.returnDate !== undefined) {
      setReturnDate(dateObj.returnDate);
    }
    if (
      dateObj.departureDate &&
      !dateObj.returnDate &&
      tripType === "One way"
    ) {
      setShowDatePicker(false);
    }
    if (
      dateObj.departureDate &&
      dateObj.returnDate &&
      tripType === "Round trip"
    ) {
      setShowDatePicker(false);
    }
  };

  const handlePassengerConfirm = (passengerData) => {
    setPassengers(passengerData.total);
    setPassengerDetails(passengerData);
    setShowPassengerSelector(false);
  };

  // Handle flight search
  const handleFlightSearch = async (e) => {
    e.stopPropagation();

    if (!originAirport || !destinationAirport) {
      toast(
        <BespokeToast
          type="error"
          message="Please select both origin and destination airports"
        />,
        { autoClose: 3000 }
      );
      return;
    }

    if (!departureDate) {
      toast(
        <BespokeToast type="error" message="Please select a departure date" />,
        { autoClose: 3000 }
      );
      return;
    }

    if (tripType === "Round trip" && !returnDate) {
      toast(
        <BespokeToast type="error" message="Please select a return date" />,
        { autoClose: 3000 }
      );
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const searchParams = {
        originSkyId: originAirport.skyId,
        destinationSkyId: destinationAirport.skyId,
        originEntityId: originAirport.entityId,
        destinationEntityId: destinationAirport.entityId,
        date: departureDate,
        returnDate: tripType === "Round trip" ? returnDate : undefined,
        cabinClass: travelClass.toLowerCase().replace(" ", ""),
        adults: passengerDetails.adults.toString(),
        children: passengerDetails.children.toString(),
        infants: (
          passengerDetails.infantsInSeat + passengerDetails.infantsOnLap
        ).toString(),
        sortBy: "best",
        currency: "USD",
        market: "en-US",
        countryCode: "US",
      };

      const flightResults = await searchFlights(searchParams);
      console.log("Flight search results:", flightResults);

      // Extract session ID from API response
      const sessionId =
        flightResults?.data?.sessionId ||
        flightResults?.sessionId ||
        flightResults?.session_id ||
        generateSessionId();

      // Prepare search data for cookies
      const newSearchData = {
        origin: originAirport,
        destination: destinationAirport,
        departureDate,
        returnDate: tripType === "Round trip" ? returnDate : null,
        tripType,
        travelClass,
        passengers: passengerDetails,
        sessionId,
        searchParams,
      };

      // Save all search data to cookies
      const saveSuccess = saveFlightSearchData(newSearchData);

      if (!saveSuccess) {
        console.warn("Failed to save search data to cookies");
      }

      // Navigate to dynamic results page
      navigate(`/flights/${sessionId}`);

      // For demo purposes, also log the demo URL
      console.log(`Demo URL: /flights/demo_${Date.now()}`);

      // Notify parent component of search update
      if (onSearchUpdate) {
        onSearchUpdate(newSearchData);
      }
    } catch (error) {
      console.error("Flight search error:", error);
      setSearchError("Failed to search flights. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ p: 3, mb: 2, border: "none", boxShadow: "none" }}
      >
        {/* Trip Options Row */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 2,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Chip
              label={tripType}
              variant="outlined"
              icon={<SwapHoriz />}
              onClick={(event) => handleMenuOpen("tripType", event)}
              sx={{
                backgroundColor: "transparent",
                border: "none",
                "& .MuiChip-label": {
                  fontWeight: 500,
                  color: "#202124",
                },
                "& .MuiChip-icon": {
                  color: "#5f6368",
                },
                "&:hover": {
                  backgroundColor: "#f8f9fa",
                },
              }}
            />

            <Chip
              label={`${passengers} passenger${passengers > 1 ? "s" : ""}`}
              variant="outlined"
              icon={<Person />}
              onClick={() => setShowPassengerSelector(true)}
              sx={{
                backgroundColor: "transparent",
                border: "none",
                "& .MuiChip-label": {
                  fontWeight: 500,
                  color: "#202124",
                },
                "& .MuiChip-icon": {
                  color: "#5f6368",
                },
                "&:hover": {
                  backgroundColor: "#f8f9fa",
                },
              }}
            />

            <Chip
              label={travelClass}
              variant="outlined"
              onClick={(event) => handleMenuOpen("travelClass", event)}
              sx={{
                backgroundColor: "transparent",
                border: "none",
                "& .MuiChip-label": {
                  fontWeight: 500,
                  color: "#202124",
                },
                "&:hover": {
                  backgroundColor: "#f8f9fa",
                },
              }}
            />
          </Box>
        </Box>

        {/* Material-UI Menus */}
        <Menu
          anchorEl={anchorEl.tripType}
          open={Boolean(anchorEl.tripType)}
          onClose={() => handleMenuClose("tripType")}
          PaperProps={{
            sx: { minWidth: 150 },
          }}
        >
          {typeOptions.map((option) => (
            <MenuItem
              key={option}
              onClick={() => handleMenuSelect("tripType", option)}
              selected={option === tripType}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        <Menu
          anchorEl={anchorEl.travelClass}
          open={Boolean(anchorEl.travelClass)}
          onClose={() => handleMenuClose("travelClass")}
          PaperProps={{
            sx: { minWidth: 150 },
          }}
        >
          {travelClassOptions.map((option) => (
            <MenuItem
              key={option}
              onClick={() => handleMenuSelect("travelClass", option)}
              selected={option === travelClass}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>

        {/* Search Fields */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Origin and Destination Container */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: "1 1 auto",
              minWidth: { xs: "100%", sm: "auto" },
            }}
          >
            {/* Origin */}
            <Paper
              elevation={0}
              sx={{
                border: "1px solid #dadce0",
                borderRadius: "8px 0 0 8px",
                p: 2,
                display: "flex",
                alignItems: "center",
                position: "relative",
                flex: 1,
                width: "100%",
                position: "relative",
                left: "15px",
              }}
            >
              <FlightTakeoff sx={{ color: "#5f6368", mr: 1 }} />
              <Box sx={{ width: "100%" }}>
                <AirportSearchDropdown
                  value={origin}
                  onChange={setOrigin}
                  onSelect={handleOriginSelect}
                  placeholder="From"
                />
              </Box>
            </Paper>

            {/* Swap Button */}
            <Button
              onClick={handleSwapLocations}
              sx={{
                minWidth: "auto",
                p: 1,
                borderRadius: "50%",
                backgroundColor: "white",
                border: "1px solid #dadce0",
                color: "#5f6368",
                mx: 0.5,
                "&:hover": {
                  backgroundColor: "#f8f9fa",
                  borderColor: "#1976d2",
                },
                position: "relative",
                zIndex: 1000,
              }}
            >
              <SwapHoriz />
            </Button>

            {/* Destination */}
            <Paper
              elevation={0}
              sx={{
                border: "1px solid #dadce0",
                borderRadius: "0 8px 8px 0",
                p: 2,
                display: "flex",
                alignItems: "center",
                flex: 1,
                width: "100%",
                position: "relative",
                right: "15px",
              }}
            >
              <FlightLand sx={{ color: "#5f6368", mr: 1 }} />
              <Box sx={{ width: "100%" }}>
                <AirportSearchDropdown
                  value={destination}
                  onChange={setDestination}
                  onSelect={handleDestinationSelect}
                  placeholder="Where to?"
                />
              </Box>
            </Paper>
          </Box>

          {/* Date Fields */}
          <Box
            sx={{
              display: "flex",
              gap: 0,
              flex: "0 0 auto",
              minWidth: { xs: "100%", md: "300px" },
            }}
          >
            {/* Departure Date */}
            <Paper
              elevation={0}
              onClick={() => handleDatePickerOpen("departure")}
              sx={{
                border: "1px solid #dadce0",
                borderRadius: tripType === "Round trip" ? "8px 0 0 8px" : "8px",
                p: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                flex: 1,
                width: "100%",
                "&:hover": {
                  borderColor: "#1976d2",
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              <CalendarToday sx={{ color: "#5f6368", mr: 1, fontSize: 20 }} />
              <Typography
                variant="body2"
                sx={{ color: departureDate ? "#202124" : "#999" }}
              >
                {departureDate ? formatDate(departureDate) : "Departure"}
              </Typography>
            </Paper>

            {/* Return Date - Only show for Round trip */}
            {tripType === "Round trip" && (
              <Paper
                elevation={0}
                onClick={() => handleDatePickerOpen("return")}
                sx={{
                  border: "1px solid #dadce0",
                  borderLeft: "none",
                  borderRadius: "0 8px 8px 0",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  flex: 1,
                  width: "100%",
                  "&:hover": {
                    borderColor: "#1976d2",
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: returnDate ? "#202124" : "#999" }}
                >
                  {returnDate ? formatDate(returnDate) : "Return"}
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DatePicker
          isOpen={showDatePicker}
          onClose={handleDatePickerClose}
          onDateSelect={handleDateSelect}
          selectedDepartureDate={departureDate}
          selectedReturnDate={returnDate}
          origin={originAirport?.skyId}
          destination={destinationAirport?.skyId}
          tripType={tripType}
        />
      )}

      {/* Passenger Selector Modal */}
      {showPassengerSelector && (
        <PassengerSelector
          isOpen={showPassengerSelector}
          onClose={() => setShowPassengerSelector(false)}
          onConfirm={handlePassengerConfirm}
          initialPassengerDetails={passengerDetails}
        />
      )}

      {/* Error Display */}
      {searchError && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {searchError}
        </Typography>
      )}
    </>
  );
};

export default EditableSearchSummary;
