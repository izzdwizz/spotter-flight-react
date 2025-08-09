import Cookies from "js-cookie";

// Cookie keys
export const COOKIE_KEYS = {
  FLIGHT_ORIGIN: "flight_origin",
  FLIGHT_DESTINATION: "flight_destination",
  FLIGHT_DATE: "flight_date",
  FLIGHT_SESSION_ID: "flight_session_id",
  FLIGHT_SEARCH_PARAMS: "flight_search_params",
  FLIGHT_RETURN_DATE: "flight_return_date",
  FLIGHT_TRIP_TYPE: "flight_trip_type",
  FLIGHT_PASSENGERS: "flight_passengers",
  FLIGHT_TRAVEL_CLASS: "flight_travel_class",
};

// Default cookie options
const DEFAULT_OPTIONS = {
  expires: 1, // 1 day
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

/**
 * Save flight search data to cookies
 * @param {Object} searchData - The search data to save
 */
export const saveFlightSearchData = (searchData) => {
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    tripType,
    passengers,
    travelClass,
    sessionId,
    searchParams,
  } = searchData;

  try {
    // Save individual pieces of data
    if (origin) {
      Cookies.set(
        COOKIE_KEYS.FLIGHT_ORIGIN,
        JSON.stringify(origin),
        DEFAULT_OPTIONS
      );
    }

    if (destination) {
      Cookies.set(
        COOKIE_KEYS.FLIGHT_DESTINATION,
        JSON.stringify(destination),
        DEFAULT_OPTIONS
      );
    }

    if (departureDate) {
      Cookies.set(COOKIE_KEYS.FLIGHT_DATE, departureDate, DEFAULT_OPTIONS);
    }

    if (returnDate) {
      Cookies.set(COOKIE_KEYS.FLIGHT_RETURN_DATE, returnDate, DEFAULT_OPTIONS);
    }

    if (tripType) {
      Cookies.set(COOKIE_KEYS.FLIGHT_TRIP_TYPE, tripType, DEFAULT_OPTIONS);
    }

    if (passengers) {
      Cookies.set(
        COOKIE_KEYS.FLIGHT_PASSENGERS,
        JSON.stringify(passengers),
        DEFAULT_OPTIONS
      );
    }

    if (travelClass) {
      Cookies.set(
        COOKIE_KEYS.FLIGHT_TRAVEL_CLASS,
        travelClass,
        DEFAULT_OPTIONS
      );
    }

    if (sessionId) {
      Cookies.set(COOKIE_KEYS.FLIGHT_SESSION_ID, sessionId, DEFAULT_OPTIONS);
    }

    if (searchParams) {
      Cookies.set(
        COOKIE_KEYS.FLIGHT_SEARCH_PARAMS,
        JSON.stringify(searchParams),
        DEFAULT_OPTIONS
      );
    }

    console.log("Flight search data saved to cookies successfully");
    return true;
  } catch (error) {
    console.error("Error saving flight search data to cookies:", error);
    return false;
  }
};

/**
 * Load flight search data from cookies
 * @returns {Object|null} - The loaded search data or null if not found
 */
export const loadFlightSearchData = () => {
  try {
    const origin = Cookies.get(COOKIE_KEYS.FLIGHT_ORIGIN);
    const destination = Cookies.get(COOKIE_KEYS.FLIGHT_DESTINATION);
    const departureDate = Cookies.get(COOKIE_KEYS.FLIGHT_DATE);
    const returnDate = Cookies.get(COOKIE_KEYS.FLIGHT_RETURN_DATE);
    const tripType = Cookies.get(COOKIE_KEYS.FLIGHT_TRIP_TYPE);
    const passengers = Cookies.get(COOKIE_KEYS.FLIGHT_PASSENGERS);
    const travelClass = Cookies.get(COOKIE_KEYS.FLIGHT_TRAVEL_CLASS);
    const sessionId = Cookies.get(COOKIE_KEYS.FLIGHT_SESSION_ID);
    const searchParams = Cookies.get(COOKIE_KEYS.FLIGHT_SEARCH_PARAMS);

    // Check if essential data exists
    if (!origin || !destination || !departureDate || !sessionId) {
      return null;
    }

    return {
      origin: JSON.parse(origin),
      destination: JSON.parse(destination),
      departureDate,
      returnDate: returnDate || null,
      tripType: tripType || "Round trip",
      passengers: passengers ? JSON.parse(passengers) : null,
      travelClass: travelClass || "Economy",
      sessionId,
      searchParams: searchParams ? JSON.parse(searchParams) : null,
    };
  } catch (error) {
    console.error("Error loading flight search data from cookies:", error);
    return null;
  }
};

/**
 * Clear all flight search cookies
 */
export const clearFlightSearchData = () => {
  try {
    Object.values(COOKIE_KEYS).forEach((key) => {
      Cookies.remove(key);
    });
    console.log("Flight search cookies cleared");
    return true;
  } catch (error) {
    console.error("Error clearing flight search cookies:", error);
    return false;
  }
};

/**
 * Check if flight search data exists in cookies
 * @returns {boolean} - True if data exists, false otherwise
 */
export const hasFlightSearchData = () => {
  const origin = Cookies.get(COOKIE_KEYS.FLIGHT_ORIGIN);
  const destination = Cookies.get(COOKIE_KEYS.FLIGHT_DESTINATION);
  const departureDate = Cookies.get(COOKIE_KEYS.FLIGHT_DATE);
  const sessionId = Cookies.get(COOKIE_KEYS.FLIGHT_SESSION_ID);

  return !!(origin && destination && departureDate && sessionId);
};

/**
 * Generate a unique session ID
 * @returns {string} - Unique session ID
 */
export const generateSessionId = () => {
  return `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
