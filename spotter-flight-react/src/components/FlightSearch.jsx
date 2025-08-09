import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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

const FlightSearch = () => {
  const navigate = useNavigate();
  const {
    searchFlights,
    setOrigin: setContextOrigin,
    setDestination: setContextDestination,
    setDepartureDate: setContextDepartureDate,
  } = useFlyContext();

  const [tripType, setTripType] = useState("Round trip");
  const [passengers, setPassengers] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });
  const [travelClass, setTravelClass] = useState("Economy");
  const [origin, setOrigin] = useState("");
  const [originAirport, setOriginAirport] = useState(null);
  const [destination, setDestination] = useState("");
  const [destinationAirport, setDestinationAirport] = useState(null);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerType, setDatePickerType] = useState("departure");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const [selectIsOpen, setSelectIsOpen] = useState({
    tripType: false,
    passengers: false,
    travelClass: false,
  });

  const [showPassengerSelector, setShowPassengerSelector] = useState(false);

  const handleSelect = (option) => {
    if (option === "passengers") {
      setShowPassengerSelector(true);
    } else {
      setSelectIsOpen({ ...selectIsOpen, [option]: !selectIsOpen[option] });
    }
  };

  const handlePassengerConfirm = (passengerData) => {
    setPassengers(passengerData.total);
    setPassengerDetails({
      adults: passengerData.adults,
      children: passengerData.children,
      infantsInSeat: passengerData.infantsInSeat,
      infantsOnLap: passengerData.infantsOnLap,
    });
    setShowPassengerSelector(false);
  };

  const handlePassengerCancel = () => {
    setShowPassengerSelector(false);
  };

  const handleDatePickerOpen = (type) => {
    setDatePickerType(type);
    setShowDatePicker(true);
  };

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
  };

  const handleDateSelect = ({
    departureDate: newDepartureDate,
    returnDate: newReturnDate,
  }) => {
    if (newDepartureDate) {
      setDepartureDate(newDepartureDate);
      // Update context for automatic price fetching
      setContextDepartureDate(newDepartureDate);
    }
    if (newReturnDate) {
      setReturnDate(newReturnDate);
    }
  };

  const handleOriginSelect = (airportData) => {
    setOriginAirport(airportData);
    // Update context for automatic price fetching
    setContextOrigin(airportData?.skyId || null);
  };

  const handleDestinationSelect = (airportData) => {
    setDestinationAirport(airportData);
    // Update context for automatic price fetching
    setContextDestination(airportData?.skyId || null);
  };

  // Helper function to map cabin class
  const mapCabinClass = (travelClass) => {
    const classMap = {
      Economy: "economy",
      "Premium Economy": "premium_economy",
      Business: "business",
      First: "first",
    };
    return classMap[travelClass] || "economy";
  };

  // Handle flight search
  const handleFlightSearch = async (e) => {
    e.stopPropagation();
    // Validate required fields
    if (!originAirport) {
      toast(
        <BespokeToast type="error" message="Please select an origin airport" />,
        {
          autoClose: 2000,
        }
      );

      return;
    }

    if (!destinationAirport) {
      toast(
        <BespokeToast
          type="error"
          message="Please select a destination airport"
        />,
        {
          autoClose: 2000,
        }
      );
      return;
    }

    if (!departureDate) {
      toast(
        <BespokeToast type="error" message="Please select a departure date" />,
        {
          autoClose: 2000,
        }
      );
      return;
    }

    if (tripType === "Round trip" && !returnDate) {
      toast(
        <BespokeToast
          type="error"
          message="Please select a return date for round trip"
        />,
        {
          autoClose: 2000,
        }
      );
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const searchParams = {
        originSkyId: originAirport.skyId,
        destinationSkyId: destinationAirport.skyId,
        originEntityId: originAirport.entityId || originAirport.skyId,
        destinationEntityId:
          destinationAirport.entityId || destinationAirport.skyId,
        date: departureDate,
        ...(tripType === "Round trip" && returnDate && { returnDate }),
        cabinClass: mapCabinClass(travelClass),
        adults: passengerDetails.adults,
        children: passengerDetails.children,
        infants: passengerDetails.infantsInSeat + passengerDetails.infantsOnLap,
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
      const searchData = {
        origin: {
          name: originAirport.presentation?.title || origin,
          iata:
            originAirport.navigation?.relevantFlightParams?.skyId ||
            originAirport.skyId,
          skyId: originAirport.skyId,
          entityId: originAirport.entityId,
        },
        destination: {
          name: destinationAirport.presentation?.title || destination,
          iata:
            destinationAirport.navigation?.relevantFlightParams?.skyId ||
            destinationAirport.skyId,
          skyId: destinationAirport.skyId,
          entityId: destinationAirport.entityId,
        },
        departureDate,
        returnDate: tripType === "Round trip" ? returnDate : null,
        tripType,
        passengers: passengerDetails,
        travelClass,
        sessionId,
        searchParams,
      };

      // Save all search data to cookies
      const saveSuccess = saveFlightSearchData(searchData);

      if (!saveSuccess) {
        console.warn("Failed to save search data to cookies");
      }

      // Navigate to dynamic results page
      navigate(`/flights/${sessionId}`);

      // For demo purposes, also log the demo URL
      console.log(`Demo URL: /flights/demo_${Date.now()}`);
    } catch (error) {
      console.error("Flight search error:", error);
      setSearchError("Failed to search flights. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSwapLocations = () => {
    const tempOrigin = origin;
    const tempOriginAirport = originAirport;

    setOrigin(destination);
    setOriginAirport(destinationAirport);
    setDestination(tempOrigin);
    setDestinationAirport(tempOriginAirport);

    // Update context for automatic price fetching
    setContextOrigin(destinationAirport?.skyId || null);
    setContextDestination(tempOriginAirport?.skyId || null);
  };

  const typeOptions = ["Round trip", "One-way", "Multi-city"];
  const travelClassOptions = [
    "Economy",
    "Premium Economy",
    "Business",
    "First",
  ];

  return (
    <SearchContainer>
      <SearchCard>
        <TripOptionsRow>
          <TypeSelector onClick={() => handleSelect("tripType")}>
            <TripTypeIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </TripTypeIcon>
            <TripTypeText>{tripType}</TripTypeText>
            <DropdownIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </DropdownIcon>
            {selectIsOpen.tripType && (
              <SelectComponent
                options={typeOptions}
                onSelect={(option) => setTripType(option)}
                field="tripType"
              />
            )}
          </TypeSelector>

          <TypeSelector onClick={() => handleSelect("passengers")}>
            <PassengerIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </PassengerIcon>
            <PassengerText>{passengers}</PassengerText>
            <DropdownIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </DropdownIcon>
          </TypeSelector>

          <TypeSelector onClick={() => handleSelect("travelClass")}>
            <ClassText>{travelClass}</ClassText>
            <DropdownIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </DropdownIcon>
            {selectIsOpen.travelClass && (
              <SelectComponent
                options={travelClassOptions}
                onSelect={(option) => setTravelClass(option)}
                field="travelClass"
              />
            )}
          </TypeSelector>
        </TripOptionsRow>

        <InputFieldsRow>
          <LocationRow>
            <OriginField>
              <LocationIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </LocationIcon>
              <AirportSearchDropdown
                value={origin}
                onChange={setOrigin}
                onSelect={handleOriginSelect}
                placeholder="From"
              />
              <SwapButton onClick={handleSwapLocations}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </SwapButton>
            </OriginField>

            <DestinationField>
              <LocationIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </LocationIcon>
              <AirportSearchDropdown
                value={destination}
                onChange={setDestination}
                onSelect={handleDestinationSelect}
                placeholder="Where to?"
              />
            </DestinationField>
          </LocationRow>
          <DateFields>
            <DateField onClick={() => handleDatePickerOpen("departure")}>
              <CalendarIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </CalendarIcon>
              <DateInput
                type="text"
                placeholder="Departure"
                value={departureDate}
                readOnly
                onClick={() => handleDatePickerOpen("departure")}
              />
            </DateField>
            <DateDivider />
            <DateField onClick={() => handleDatePickerOpen("return")}>
              <DateInput
                type="text"
                placeholder="Return"
                value={returnDate}
                readOnly
                onClick={() => handleDatePickerOpen("return")}
              />
            </DateField>
          </DateFields>
        </InputFieldsRow>
      </SearchCard>

      {searchError &&
        toast(
          <BespokeToast
            type="error"
            title="Error"
            message={
              searchError ||
              error.response?.data?.message ||
              error?.message ||
              "Failed to fetch user data"
            }
          />
        )}
      <SearchButton
        onClick={(e) => handleFlightSearch(e)}
        disabled={isSearching}
      >
        <SearchIcon>
          {isSearching ? (
            <LoadingSpinner />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </SearchIcon>
        {isSearching ? "Searching..." : "Search"}
      </SearchButton>
      {showPassengerSelector && (
        <PassengerSelector
          onClose={handlePassengerCancel}
          onConfirm={handlePassengerConfirm}
          initialPassengers={passengerDetails.adults}
          initialPassengerDetails={passengerDetails}
        />
      )}
      {showDatePicker && (
        <DatePicker
          isOpen={showDatePicker}
          onClose={handleDatePickerClose}
          onDateSelect={handleDateSelect}
          selectedDepartureDate={departureDate}
          selectedReturnDate={returnDate}
          origin={originAirport?.skyId || origin}
          destination={destinationAirport?.skyId || destination}
          tripType={tripType}
        />
      )}
    </SearchContainer>
  );
};

const SelectComponent = ({ options, onSelect, field }) => {
  return (
    <SelectWrapper options={options} onSelect={onSelect} field={field}>
      {options.map((option) => (
        <SelectOption key={option} onClick={() => onSelect(option)}>
          {option}
        </SelectOption>
      ))}
    </SelectWrapper>
  );
};

// Select Component Styling
const SelectWrapper = styled.div`
  position: absolute;
  top: 40px;

  width: 100%;
  height: 100%;
  min-height: max-content;
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3),
    0 4px 8px 3px rgba(60, 64, 67, 0.15);
  z-index: 1000;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  max-height: 150px;
  min-width: max-content;
`;

const SelectOption = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #202124;
  white-space: nowrap;

  &:hover {
    background-color: #f3f4f6;
  }
`;

// Styled Components
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  top: 2rem;
`;

const SearchCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3),
    0 4px 8px 3px rgba(60, 64, 67, 0.15);

  padding: 1.5rem;
  width: 100%;
  padding-bottom: 2.5rem;
`;

const TripOptionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const TypeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const TripTypeIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
`;

const TripTypeText = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #202124;
`;

const PassengerIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
`;

const PassengerText = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #202124;
`;

const ClassText = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #202124;
`;

const DropdownIcon = styled.div`
  width: 1rem;
  height: 1rem;
  color: #6b7280;
`;

const InputFieldsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LocationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

const OriginField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  background-color: transparent;
  position: relative;
  &:focus-within {
    border: 1.5px solid rgb(71, 129, 244);
  }
`;

const LocationIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
  flex-shrink: 0;
`;

const SwapButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
  position: absolute;
  border: 1px solid #e5e7eb;
  right: -10%;

  &:hover {
    background-color: #e5e7eb;
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: #6b7280;
  }
`;

const DestinationField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;

  background-color: transparent;
  &:focus-within {
    border: 1.5px solid rgb(71, 129, 244);
  }
`;

const DateFields = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background-color: #f9fafb;
`;

const DateField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const CalendarIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
  flex-shrink: 0;
`;

const DateInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 1rem;
  color: #202124;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }
`;

const DateDivider = styled.div`
  width: 1px;
  height: 1.5rem;
  background-color: #e5e7eb;
  margin: 0 0.75rem;
`;

const ErrorMessage = styled.div`
  color: #d93025;
  background-color: #fce8e6;
  border: 1px solid #d93025;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${(props) =>
    props.disabled ? "#9aa0a6" : "rgb(23, 104, 209)"};
  box-shadow: 0 1px 3px 0 rgba(60, 64, 67, 0.3),
    0 4px 8px 3px rgba(60, 64, 67, 0.15);

  color: white;
  border: none;
  position: relative;
  bottom: 3rem;
  border-radius: 24.5px;
  padding: 0.875rem 2rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #1557b0;
  }
`;

const SearchIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;

  svg {
    width: 100%;
    height: 100%;
    color: white;
  }
`;

export default FlightSearch;
