import React, { useState } from "react";
import styled from "styled-components";

const PassengerSelector = ({
  onClose,
  onConfirm,
  initialPassengers = 1,
  initialPassengerDetails = {
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  },
}) => {
  const [passengers, setPassengers] = useState({
    adults: initialPassengerDetails.adults || initialPassengers,
    children: initialPassengerDetails.children || 0,
    infantsInSeat: initialPassengerDetails.infantsInSeat || 0,
    infantsOnLap: initialPassengerDetails.infantsOnLap || 0,
  });

  const totalPassengers =
    passengers.adults +
    passengers.children +
    passengers.infantsInSeat +
    passengers.infantsOnLap;

  const updatePassengerCount = (type, increment) => {
    setPassengers((prev) => {
      const newValue = prev[type] + increment;

      // Validation rules
      if (type === "adults" && newValue < 1) return prev; // At least 1 adult
      if (type === "adults" && newValue > 9) return prev; // Max 9 adults
      if (type === "children" && newValue < 0) return prev; // Min 0 children
      if (type === "children" && newValue > 8) return prev; // Max 8 children
      if (type === "infantsInSeat" && newValue < 0) return prev; // Min 0 infants
      if (type === "infantsInSeat" && newValue > 4) return prev; // Max 4 infants
      if (type === "infantsOnLap" && newValue < 0) return prev; // Min 0 infants
      if (type === "infantsOnLap" && newValue > 4) return prev; // Max 4 infants

      // Total passengers limit
      const total =
        prev.adults +
        prev.children +
        prev.infantsInSeat +
        prev.infantsOnLap +
        increment;
      if (total > 9) return prev; // Max 9 total passengers

      return {
        ...prev,
        [type]: newValue,
      };
    });
  };

  const handleConfirm = () => {
    // Return detailed passenger breakdown instead of just total
    onConfirm({
      total: totalPassengers,
      adults: passengers.adults,
      children: passengers.children,
      infantsInSeat: passengers.infantsInSeat,
      infantsOnLap: passengers.infantsOnLap,
    });
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <PassengerSection>
          <PassengerRow>
            <PassengerInfo>
              <PassengerLabel>Adults</PassengerLabel>
            </PassengerInfo>
            <CounterControls>
              <CounterButton
                disabled={passengers.adults <= 1}
                onClick={() => updatePassengerCount("adults", -1)}
              >
                <MinusIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </MinusIcon>
              </CounterButton>
              <PassengerCount>{passengers.adults}</PassengerCount>
              <CounterButton
                disabled={totalPassengers >= 9}
                onClick={() => updatePassengerCount("adults", 1)}
              >
                <PlusIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </PlusIcon>
              </CounterButton>
            </CounterControls>
          </PassengerRow>

          <PassengerRow>
            <PassengerInfo>
              <PassengerLabel>Children</PassengerLabel>
              <PassengerSubLabel>Aged 2-11</PassengerSubLabel>
            </PassengerInfo>
            <CounterControls>
              <CounterButton
                disabled={passengers.children <= 0}
                onClick={() => updatePassengerCount("children", -1)}
              >
                <MinusIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </MinusIcon>
              </CounterButton>
              <PassengerCount>{passengers.children}</PassengerCount>
              <CounterButton
                disabled={totalPassengers >= 9}
                onClick={() => updatePassengerCount("children", 1)}
              >
                <PlusIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </PlusIcon>
              </CounterButton>
            </CounterControls>
          </PassengerRow>

          <PassengerRow>
            <PassengerInfo>
              <PassengerLabel>Infants</PassengerLabel>
              <PassengerSubLabel>In seat</PassengerSubLabel>
            </PassengerInfo>
            <CounterControls>
              <CounterButton
                disabled={passengers.infantsInSeat <= 0}
                onClick={() => updatePassengerCount("infantsInSeat", -1)}
              >
                <MinusIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </MinusIcon>
              </CounterButton>
              <PassengerCount>{passengers.infantsInSeat}</PassengerCount>
              <CounterButton
                disabled={totalPassengers >= 9}
                onClick={() => updatePassengerCount("infantsInSeat", 1)}
              >
                <PlusIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </PlusIcon>
              </CounterButton>
            </CounterControls>
          </PassengerRow>

          <PassengerRow>
            <PassengerInfo>
              <PassengerLabel>Infants</PassengerLabel>
              <PassengerSubLabel>On lap</PassengerSubLabel>
            </PassengerInfo>
            <CounterControls>
              <CounterButton
                disabled={passengers.infantsOnLap <= 0}
                onClick={() => updatePassengerCount("infantsOnLap", -1)}
              >
                <MinusIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </MinusIcon>
              </CounterButton>
              <PassengerCount>{passengers.infantsOnLap}</PassengerCount>
              <CounterButton
                disabled={totalPassengers >= 9}
                onClick={() => updatePassengerCount("infantsOnLap", 1)}
              >
                <PlusIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </PlusIcon>
              </CounterButton>
            </CounterControls>
          </PassengerRow>
        </PassengerSection>

        <ActionButtons>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <DoneButton onClick={handleConfirm}>Done</DoneButton>
        </ActionButtons>
      </Modal>
    </Overlay>
  );
};

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  min-width: 300px;
  max-width: 400px;
`;

const PassengerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PassengerRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

const PassengerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const PassengerLabel = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #202124;
`;

const PassengerSubLabel = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.75rem;
  color: #5f6368;
`;

const CounterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CounterButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: 1px solid #dadce0;
  border-radius: 0.25rem;
  background: ${(props) => (props.disabled ? "#f1f3f4" : "white")};
  color: ${(props) => (props.disabled ? "#9aa0a6" : "#1a73e8")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #f8f9fa;
    border-color: #1a73e8;
  }

  &:active:not(:disabled) {
    background-color: #e8f0fe;
  }
`;

const MinusIcon = styled.div`
  width: 1rem;
  height: 1rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const PlusIcon = styled.div`
  width: 1rem;
  height: 1rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const PassengerCount = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #202124;
  min-width: 1.5rem;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #dadce0;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #1a73e8;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const DoneButton = styled.button`
  background: none;
  border: none;
  color: #1a73e8;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export default PassengerSelector;
