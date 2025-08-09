import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const FlyContext = createContext();

export const FlightProvider = ({ children }) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [tripType, setTripType] = useState("Round trip");
  const [flightData, setFlightData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [priceCalendarData, setPriceCalendarData] = useState(null);

  //   CALENDAR PRICE ENDPOINT SHOULD GO HERE
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      getAirports();
    }
  }, [latitude, longitude]);

  const getAirports = async () => {
    try {
      const response = await axios.get(
        "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports",
        {
          params: {
            lat: latitude,
            lng: longitude,
          },
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error getting airports:", error);
    }
  };

  const searchAirports = async (query) => {
    if (!query || query.length < 2) return [];

    const options = {
      method: "GET",
      url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
      params: {
        query: query,
        locale: "en-US",
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data?.data || [];
    } catch (error) {
      console.error("Error searching airports:", error);
      return [];
    }
  };

  const useAirportSearch = (query, enabled = true) => {
    return useQuery({
      queryKey: ["airportSearch", query],
      queryFn: () => searchAirports(query),
      enabled: enabled && query && query.length >= 2,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    });
  };

  // Flight search function
  const searchFlights = async (searchParams) => {
    const {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      returnDate,
      cabinClass = "economy",
      adults = 1,
      children = 0,
      infants = 0,
      sortBy = "best",
      currency = "USD",
      market = "en-US",
      countryCode = "US",
    } = searchParams;

    // Validate required parameters
    if (
      !originSkyId ||
      !destinationSkyId ||
      !originEntityId ||
      !destinationEntityId ||
      !date
    ) {
      throw new Error("Missing required parameters for flight search");
    }

    const options = {
      method: "GET",
      url: "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightsComplete",
      params: {
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date,
        ...(returnDate && { returnDate }),
        cabinClass,
        adults: adults.toString(),
        ...(children > 0 && { childrens: children.toString() }),
        ...(infants > 0 && { infants: infants.toString() }),
        sortBy,
        currency,
        market,
        countryCode,
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error("Error searching flights:", error);
      throw error;
    }
  };

  // Custom hook for flight search
  const useFlightSearch = (searchParams, enabled = true) => {
    return useQuery({
      queryKey: ["flightSearch", searchParams],
      queryFn: () => searchFlights(searchParams),
      enabled:
        enabled &&
        searchParams &&
        searchParams.originSkyId &&
        searchParams.destinationSkyId &&
        searchParams.originEntityId &&
        searchParams.destinationEntityId &&
        searchParams.date,
      staleTime: 2 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      retry: 1,
    });
  };

  // Flight details function
  const getFlightDetails = async (searchParams) => {
    const {
      originSkyId,
      destinationSkyId,
      date,
      returnDate,
      adults = 1,
      children = 0,
      infants = 0,
      cabinClass = "economy",
      currency = "USD",
      locale = "en-US",
      market = "en-US",
      countryCode = "US",
    } = searchParams;

    // Validate required parameters
    if (!originSkyId || !destinationSkyId || !date) {
      throw new Error("Missing required parameters for flight details");
    }

    // Construct legs array based on trip type
    const legs = [
      {
        origin: originSkyId,
        destination: destinationSkyId,
        date: date,
      },
    ];

    // Add return leg for round trip
    if (returnDate) {
      legs.push({
        origin: destinationSkyId,
        destination: originSkyId,
        date: returnDate,
      });
    }

    const options = {
      method: "GET",
      url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails",
      params: {
        legs: JSON.stringify(legs),
        adults: adults.toString(),
        ...(children > 0 && { children: children.toString() }),
        ...(infants > 0 && { infants: infants.toString() }),
        currency,
        locale,
        market,
        cabinClass,
        countryCode,
      },
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error("Error getting flight details:", error);
      throw error;
    }
  };

  // Custom hook for flight details
  const useFlightDetails = (searchParams, enabled = true) => {
    return useQuery({
      queryKey: ["flightDetails", searchParams],
      queryFn: () => getFlightDetails(searchParams),
      enabled: enabled && !!searchParams,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    });
  };

  // Format dates for API
  const formatDateForAPI = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Flight price calendar function
  const fetchFlightPrices = async (originSkyId, destinationSkyId, fromDate) => {
    if (!originSkyId || !destinationSkyId || !fromDate) return null;

    const options = {
      method: "GET",
      url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getPriceCalendar",
      params: {
        originSkyId,
        destinationSkyId,
        fromDate,
        currency: "USD",
      },
      headers: {
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error("Error fetching flight prices:", error);
      return null;
    }
  };

  // Custom hook for price calendar
  const usePriceCalendar = (
    originSkyId,
    destinationSkyId,
    fromDate,
    enabled = true
  ) => {
    return useQuery({
      queryKey: ["flightPrices", originSkyId, destinationSkyId, fromDate],
      queryFn: () => fetchFlightPrices(originSkyId, destinationSkyId, fromDate),
      enabled: enabled && !!originSkyId && !!destinationSkyId && !!fromDate,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  // Auto-fetch price calendar when conditions are met
  useEffect(() => {
    if (origin && destination && departureDate) {
      // Trigger price calendar fetch automatically
      console.log("Auto-fetching price calendar for:", {
        origin,
        destination,
        departureDate,
      });

      // Automatically fetch price calendar data
      const fetchPrices = async () => {
        try {
          const priceData = await fetchFlightPrices(
            origin,
            destination,
            departureDate
          );
          setPriceCalendarData(priceData);
          console.log("Price calendar data fetched:", priceData);
        } catch (error) {
          console.error("Error fetching price calendar:", error);
        }
      };

      fetchPrices();
    }
  }, [origin, destination, departureDate]);

  const value = {
    // Airport search
    searchAirports,
    useAirportSearch,
    // Flight search
    searchFlights,
    useFlightSearch,
    // Flight details
    getFlightDetails,
    useFlightDetails,
    // Price calendar
    fetchFlightPrices,
    usePriceCalendar,
    formatDateForAPI,
    // State
    origin,
    setOrigin,
    destination,
    setDestination,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    tripType,
    setTripType,
    priceCalendarData,
    setPriceCalendarData,
  };

  return <FlyContext.Provider value={value}>{children}</FlyContext.Provider>;
};

export const useFlyContext = () => {
  return useContext(FlyContext);
};
