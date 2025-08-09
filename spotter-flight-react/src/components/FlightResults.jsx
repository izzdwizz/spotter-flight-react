import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Container,
  Typography,
  Alert,
  Box,
  Button,
  Chip,
  Stack,
  Paper,
  Select,
  FormControl,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  TuneOutlined,
  SwapVert,
  KeyboardArrowDown,
  FilterList,
} from "@mui/icons-material";
import {
  loadFlightSearchData,
  hasFlightSearchData,
} from "../utils/cookieManager";
import FlightCard from "./FlightCard";
import { getDummyFlightOptions } from "../data/dummyFlightData";
import { toast } from "react-toastify";
import BespokeToast from "./CustomToast/BespokeToast";
import EditableSearchSummary from "./EditableSearchSummary";
const FlightResults = () => {
  const { searchId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchData, setSearchData] = useState(null);
  const [activeTab, setActiveTab] = useState("Best");
  const [flightOptions, setFlightOptions] = useState([]);
  const [isLoadingFlights, setIsLoadingFlights] = useState(true);
  const [flightError, setFlightError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All filters");

  // Filter options data
  const filterOptions = [
    { id: "all", label: "All filters", icon: false },
    { id: "stops", label: "Stops" },
    { id: "airlines", label: "Airlines" },
    { id: "bags", label: "Bags" },
    { id: "price", label: "Price" },
    { id: "times", label: "Times" },
    { id: "emissions", label: "Emissions" },
    { id: "connecting", label: "Connecting airports" },
    { id: "duration", label: "Duration" },
  ];

  // Handle filter selection
  const handleFilterSelect = (filterId, filterLabel) => {
    setSelectedFilter(filterLabel);
    toast(<BespokeToast type="error" message="Filter not available" />, {
      autoClose: 3000,
    });
  };

  // Handle search updates from EditableSearchSummary
  const handleSearchUpdate = (newSearchData) => {
    setSearchData(newSearchData);
    // Optionally reload flight results with new search criteria
    setIsLoadingFlights(true);
    // Simulate new search with updated data
    setTimeout(() => {
      const updatedResults = getDummyFlightOptions(newSearchData.tripType, 2);
      setFlightOptions(updatedResults);
      setIsLoadingFlights(false);
    }, 1500);
  };

  // Use dummy data instead of API calls for now
  useEffect(() => {
    if (searchData) {
      setIsLoadingFlights(true);

      // Simulate API loading delay
      const timer = setTimeout(() => {
        try {
          const dummyData = getDummyFlightOptions(searchData.tripType, 2);
          setFlightOptions(dummyData);
          setFlightError(null);
        } catch (error) {
          setFlightError(error);
        } finally {
          setIsLoadingFlights(false);
        }
      }, 1500); // 1.5 second delay to simulate loading

      return () => clearTimeout(timer);
    }
  }, [searchData]);

  // Original API call (commented out for now)
  // const {
  //   data: flightDetails,
  //   isLoading: isLoadingFlights,
  //   error: flightError,
  // } = useFlightDetails(
  //   searchData?.searchParams,
  //   !!searchData?.searchParams // Only fetch when search data is available
  // );

  useEffect(() => {
    // Check if flight search data exists
    if (!hasFlightSearchData()) {
      console.warn("No flight search data found, using dummy data for demo");
      // For demo purposes, create dummy search data
      setSearchData({
        origin: { name: "London Gatwick", iata: "LGW" },
        destination: { name: "New York John F. Kennedy", iata: "JFK" },
        departureDate: "2024-08-20",
        returnDate: "2024-08-27",
        tripType: "Round trip",
        sessionId: searchId,
      });
      return;
    }

    // Load search data from cookies
    const loadedData = loadFlightSearchData();

    if (loadedData) {
      // Verify the session ID matches the URL parameter
      if (loadedData.sessionId !== searchId) {
        console.warn("Session ID mismatch, using dummy data for demo");
        setSearchData({
          origin: { name: "London Gatwick", iata: "LGW" },
          destination: { name: "New York John F. Kennedy", iata: "JFK" },
          departureDate: "2024-08-20",
          returnDate: "2024-08-27",
          tripType: "Round trip",
          sessionId: searchId,
        });
        return;
      }

      setSearchData(loadedData);
    } else {
      console.warn("Failed to load search data, using dummy data for demo");
      setSearchData({
        origin: { name: "London Gatwick", iata: "LGW" },
        destination: { name: "New York John F. Kennedy", iata: "JFK" },
        departureDate: "2024-08-20",
        returnDate: "2024-08-27",
        tripType: "Round trip",
        sessionId: searchId,
      });
    }
  }, [searchId, navigate]);

  if (!searchData) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading flight results...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <ResultsContainer>
      {/* Demo Notice */}
      <Alert severity="info" sx={{ mb: 2 }}>
        🔧 Demo Mode: Showing sample flight data while API is unavailable
      </Alert>

      {/* Editable Search Summary */}
      <EditableSearchSummary
        searchData={searchData}
        onSearchUpdate={handleSearchUpdate}
      />

      {/* Responsive Filters Row */}
      <FiltersContainer>
        {isMobile ? (
          // Mobile Dropdown
          <Box sx={{ width: "100%", maxWidth: "300px" }}>
            <FormControl fullWidth variant="outlined" size="small">
              <Select
                value={selectedFilter}
                onChange={(e) => {
                  const selectedOption = filterOptions.find(
                    (option) => option.label === e.target.value
                  );
                  handleFilterSelect(selectedOption.id, selectedOption.label);
                }}
                displayEmpty
                startAdornment={<FilterList sx={{ color: "#1a73e8", mr: 1 }} />}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#dadce0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1a73e8",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1a73e8",
                    },
                  },
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#202124",
                  },
                }}
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option.id} value={option.label}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {option.icon && (
                        <FilterList
                          sx={{ fontSize: "1rem", color: "#1a73e8" }}
                        />
                      )}
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ) : (
          // Desktop Buttons
          <>
            <FilterButton
              active
              onClick={() => handleFilterSelect("all", "All filters")}
            >
              <FilterIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                  />
                </svg>
              </FilterIcon>
              All filters
            </FilterButton>

            {filterOptions.slice(1).map((option) => (
              <FilterButton
                key={option.id}
                onClick={() => handleFilterSelect(option.id, option.label)}
              >
                {option.label}
              </FilterButton>
            ))}
          </>
        )}
      </FiltersContainer>

      {/* Results Section */}
      <ResultsSection>
        {/* Sorting Tabs */}
        <SortingTabs>
          <SortTab
            active={activeTab === "Best"}
            onClick={() => setActiveTab("Best")}
          >
            <TabContent>
              <TabLabel>Best</TabLabel>
              <InfoIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </InfoIcon>
            </TabContent>
          </SortTab>

          <SortTab
            active={activeTab === "Cheapest"}
            onClick={() => setActiveTab("Cheapest")}
          >
            <TabContent>
              <TabLabel>Cheapest</TabLabel>
              {flightOptions.length > 0 && (
                <TabPrice>
                  from $
                  {Math.min(
                    ...flightOptions.flatMap((flight) =>
                      flight.data.itinerary.pricingOptions.map(
                        (option) => option.totalPrice
                      )
                    )
                  )}
                </TabPrice>
              )}
              <InfoIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </InfoIcon>
            </TabContent>
          </SortTab>
        </SortingTabs>

        {/* Price Notice */}
        <PriceNotice>
          <PriceIcon>📊</PriceIcon>
          <PriceText>Prices are currently typical</PriceText>
        </PriceNotice>

        {/* Flight Results */}
        <FlightResultsContainer>
          {/* Results Header */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
                fontWeight: 600,
                fontFamily: "Google Sans, Roboto, Arial, sans-serif",
              }}
            >
              All flights
            </Typography>
          </Box>

          {isLoadingFlights && (
            <LoadingContainer>
              <LoadingSpinner />
              <LoadingText>Loading flight results...</LoadingText>
            </LoadingContainer>
          )}

          {flightError && (
            <ErrorContainer>
              <ErrorText>
                Failed to load flight results. Please try again.
              </ErrorText>
              <RetryButton onClick={() => window.location.reload()}>
                Retry
              </RetryButton>
            </ErrorContainer>
          )}

          {flightOptions.length > 0 && !isLoadingFlights && !flightError && (
            <>
              {flightOptions.map((flight, index) => (
                <FlightCard key={index} itinerary={flight.data.itinerary} />
              ))}
            </>
          )}

          {!isLoadingFlights && !flightError && flightOptions.length === 0 && (
            <NoResultsContainer>
              <NoResultsText>
                No flights found for your search criteria.
              </NoResultsText>
              <SearchAgainButton onClick={() => navigate("/")}>
                Search again
              </SearchAgainButton>
            </NoResultsContainer>
          )}
        </FlightResultsContainer>
      </ResultsSection>
    </ResultsContainer>
  );
};

// Styled Components
const ResultsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
`;

const DemoNotice = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #856404;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1rem;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1a73e8;
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

const LoadingText = styled.p`
  color: #5f6368;
  font-size: 1rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => (props.active ? "transparent" : "#dadce0")};

  border-radius: 8px;
  background: ${(props) => (props.active ? "transparent" : "white")};
  color: ${(props) => (props.active ? "#1a73e8" : "#202124")};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
    border-color: #1a73e8;
  }
`;

const FilterIcon = styled.div`
  width: 1rem;
  height: 1rem;
`;

const ResultsSection = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  // overflow: hidden;
`;

const SortingTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #dadce0;
`;

const SortTab = styled.button`
  flex: 1;
  padding: 1rem;
  border: none;
  background: ${(props) => (props.active ? "#e8f0fe" : "white")};

  border: ${(props) =>
    props.active ? "1px solid #1a73e8" : "3px solid transparent"};
  border-bottom: ${(props) =>
    props.active ? "3px solid #1a73e8" : "3px solid transparent"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const TabContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const TabLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #202124;
`;

const TabPrice = styled.span`
  font-size: 0.75rem;
  color: #5f6368;
`;

const InfoIcon = styled.div`
  width: 1rem;
  height: 1rem;
  color: #5f6368;
`;

const PriceNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: transparent;
  border-bottom: none;
`;

const PriceIcon = styled.span`
  font-size: 1rem;
`;

const PriceText = styled.span`
  flex: 1;
  font-size: 0.875rem;
  color: #202124;
`;

const FlightResultsContainer = styled.div`
  padding: 1rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
`;

const ErrorText = styled.p`
  color: #d93025;
  font-size: 1rem;
  text-align: center;
`;

const RetryButton = styled.button`
  background: #1a73e8;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #1557b0;
  }
`;

const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
`;

const NoResultsText = styled.p`
  color: #5f6368;
  font-size: 1rem;
  text-align: center;
`;

const SearchAgainButton = styled.button`
  background: #1a73e8;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #1557b0;
  }
`;

export default FlightResults;
