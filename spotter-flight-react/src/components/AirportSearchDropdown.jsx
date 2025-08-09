import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useFlyContext } from "../context/FlightContext";

const AirportSearchDropdown = ({
  value,
  onChange,
  onSelect,
  placeholder = "From",
  isOpen,
  onToggle,
}) => {
  const [query, setQuery] = useState(value || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const { useAirportSearch } = useFlyContext();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch airport data based on query
  const {
    data: airports = [],
    isLoading,
    error,
  } = useAirportSearch(query, query.length >= 3);

  // Update query when value prop changes
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange(newValue);
    setShowDropdown(newValue.length >= 2);
  };

  // Handle airport selection
  const handleAirportSelect = (airport) => {
    const selectedValue = airport.presentation.title;
    const skyId = airport.navigation.relevantFlightParams.skyId;

    setQuery(selectedValue);
    setShowDropdown(false);

    // Call both onChange and onSelect
    onChange(selectedValue);
    onSelect({
      name: selectedValue,
      skyId: skyId,
      entityId: airport.navigation.entityId,
      subtitle: airport.presentation.subtitle,
      entityType: airport.navigation.entityType,
    });

    // Blur the input to remove focus
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle input focus
  const handleInputFocus = () => {
    if (query.length >= 2) {
      setShowDropdown(true);
    }
  };

  return (
    <Container ref={dropdownRef}>
      <Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
      />

      {showDropdown && (
        <DropdownContainer>
          {isLoading && (
            <LoadingItem>
              <LoadingSpinner />
              Searching...
            </LoadingItem>
          )}

          {error && (
            <ErrorItem>Error searching airports. Please try again.</ErrorItem>
          )}

          {!isLoading &&
            !error &&
            airports.length === 0 &&
            query.length >= 2 && (
              <NoResultsItem>No airports found for "{query}"</NoResultsItem>
            )}

          {!isLoading && !error && airports.length > 0 && (
            <>
              {airports.map((airport, index) => (
                <DropdownItem
                  key={`${airport.navigation.entityId}-${index}`}
                  onClick={() => handleAirportSelect(airport)}
                >
                  <AirportInfo>
                    <AirportIcon>
                      {airport.navigation.entityType === "AIRPORT" ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.5-7 0 0 3 2 5 2 1.3-2.5 2.7-2 2.7-2A8 8 0 0117.657 18.657z"
                          />
                        </svg>
                      ) : (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </AirportIcon>
                    <AirportDetails>
                      <AirportTitle>{airport.presentation.title}</AirportTitle>
                      <AirportSubtitle>
                        {airport.presentation.subtitle}
                      </AirportSubtitle>
                      {airport.navigation.entityType === "AIRPORT" && (
                        <AirportCode>
                          {airport.navigation.relevantFlightParams.skyId}
                        </AirportCode>
                      )}
                    </AirportDetails>
                  </AirportInfo>
                  <AddIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </AddIcon>
                </DropdownItem>
              ))}
            </>
          )}
        </DropdownContainer>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  position: relative;
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
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

const DropdownContainer = styled.div`
  position: absolute;
  top: 1.8rem;
  left: -0.75rem;
  right: -0.75rem;
  background: white;
  border-radius: 0.5rem;
  min-width: max-content;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f3f4f6;
  min-width: max-content;
  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const AirportInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`;

const AirportIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const AirportDetails = styled.div`
  display: flex;
  // flex-direction: column;
  white-space: nowrap;

  gap: 0.5rem;
  flex: 1;
`;

const AirportTitle = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #202124;
`;

const AirportSubtitle = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.75rem;
  color: #6b7280;
`;

const AirportCode = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 600;
`;

const AddIcon = styled.div`
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const LoadingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #6b7280;
`;

const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid #f3f4f6;
  border-top: 2px solid #1a73e8;
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

const ErrorItem = styled.div`
  padding: 1rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #dc2626;
  text-align: center;
`;

const NoResultsItem = styled.div`
  padding: 1rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
`;

export default AirportSearchDropdown;
