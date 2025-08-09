import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useFlyContext } from "../context/FlightContext";

const DatePicker = ({
  isOpen,
  onClose,
  onDateSelect,
  selectedDepartureDate,
  selectedReturnDate,
  origin,
  destination,
  tripType = "Round trip",
}) => {
  const { usePriceCalendar, formatDateForAPI } = useFlyContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [nextMonth, setNextMonth] = useState(() => {
    const next = new Date();
    next.setMonth(next.getMonth() + 1);
    return next;
  });

  // Use price calendar hook from context
  const { data: priceData, isLoading } = usePriceCalendar(
    origin,
    destination,
    formatDateForAPI(currentMonth),
    isOpen // enabled when modal is open
  );

  // Create price map for easy lookup
  const priceMap = React.useMemo(() => {
    if (!priceData?.data?.flights?.days) return {};

    const map = {};
    priceData.data.flights.days.forEach((day) => {
      map[day.day] = {
        price: day.price,
        group: day.group,
      };
    });
    return map;
  }, [priceData]);

  // Generate calendar days for a month
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    while (currentDate <= lastDay || currentDate.getDay() !== 0) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  // Navigate months
  const navigateMonth = (direction, isNextMonth = false) => {
    const targetMonth = isNextMonth ? nextMonth : currentMonth;
    const newDate = new Date(targetMonth);

    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }

    if (isNextMonth) {
      setNextMonth(newDate);
      const newCurrentMonth = new Date(newDate);
      newCurrentMonth.setMonth(newCurrentMonth.getMonth() - 1);
      setCurrentMonth(newCurrentMonth);
    } else {
      setCurrentMonth(newDate);
      const newNextMonth = new Date(newDate);
      newNextMonth.setMonth(newNextMonth.getMonth() + 1);
      setNextMonth(newNextMonth);
    }
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    const formattedDate = formatDateForAPI(date);

    if (tripType === "One-way") {
      onDateSelect({ departureDate: formattedDate });
      onClose();
    } else {
      if (
        !selectedDepartureDate ||
        (selectedDepartureDate && selectedReturnDate)
      ) {
        onDateSelect({ departureDate: formattedDate, returnDate: null });
      } else {
        const departureDate = new Date(selectedDepartureDate);
        const returnDate = new Date(date);

        if (returnDate > departureDate) {
          onDateSelect({
            departureDate: selectedDepartureDate,
            returnDate: formattedDate,
          });
          onClose();
        }
      }
    }
  };

  // Check if date is selected
  const isDateSelected = (date) => {
    const formattedDate = formatDateForAPI(date);
    return (
      formattedDate === selectedDepartureDate ||
      formattedDate === selectedReturnDate
    );
  };

  // Check if date is departure date
  const isDepartureDate = (date) => {
    const formattedDate = formatDateForAPI(date);
    return formattedDate === selectedDepartureDate;
  };

  // Check if date is return date
  const isReturnDate = (date) => {
    const formattedDate = formatDateForAPI(date);
    return formattedDate === selectedReturnDate;
  };

  // Check if date is in range (for round trip)
  const isInRange = (date) => {
    if (
      tripType !== "Round trip" ||
      !selectedDepartureDate ||
      !selectedReturnDate
    )
      return false;

    const formattedDate = formatDateForAPI(date);
    const departure = new Date(selectedDepartureDate);
    const returnDate = new Date(selectedReturnDate);
    const current = new Date(formattedDate);

    return current > departure && current < returnDate;
  };

  // Format date for display
  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Get price for a specific date
  const getPriceForDate = (date) => {
    const formattedDate = formatDateForAPI(date);
    return priceMap[formattedDate];
  };

  // Get price color based on group
  const getPriceColor = (group) => {
    switch (group) {
      case "low":
        return "#137333";
      case "medium":
        return "#202124";
      case "high":
        return "#d93025";
      default:
        return "#5f6368";
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedDepartureDate || !selectedReturnDate) return null;

    const departurePrice = priceMap[selectedDepartureDate]?.price || 0;
    const returnPrice = priceMap[selectedReturnDate]?.price || 0;

    return departurePrice + returnPrice;
  };

  const totalPrice = calculateTotalPrice();

  if (!isOpen) return null;

  const handleReset = () => {
    return onDateSelect({ departureDate: null, returnDate: null });
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <TripTypeSelector>
            <TripTypeDropdown>
              {tripType}
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
            </TripTypeDropdown>
          </TripTypeSelector>

          <ResetButton onClick={handleReset}>Reset</ResetButton>

          <DateSelectors>
            <DateSelector>
              <DateLabel>Departure</DateLabel>
              <DateValue selected={selectedDepartureDate}>
                {selectedDepartureDate
                  ? formatDateForDisplay(new Date(selectedDepartureDate))
                  : "Select date"}
              </DateValue>
            </DateSelector>

            {tripType === "Round trip" && (
              <DateSelector>
                <DateLabel>Return</DateLabel>
                <DateValue selected={selectedReturnDate}>
                  {selectedReturnDate
                    ? formatDateForDisplay(new Date(selectedReturnDate))
                    : "Select date"}
                </DateValue>
              </DateSelector>
            )}
          </DateSelectors>
        </Header>

        <CalendarContainer>
          <Calendar>
            <CalendarHeader>
              {/* Add navigation arrows for single calendar when not Round trip */}
              {tripType !== "Round trip" && (
                <NextMonthArrow
                  className="prev-arrow"
                  onClick={() => navigateMonth("prev")}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 18l-6-6 6-6"
                    />
                  </svg>
                </NextMonthArrow>
              )}
              <MonthName>{getMonthName(currentMonth)}</MonthName>
              {/* Add navigation arrows for single calendar when not Round trip */}
              {tripType !== "Round trip" && (
                <NextMonthArrow onClick={() => navigateMonth("next")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </NextMonthArrow>
              )}
            </CalendarHeader>
            <CalendarGrid>
              <DayHeader>Sun</DayHeader>
              <DayHeader>Mon</DayHeader>
              <DayHeader>Tue</DayHeader>
              <DayHeader>Wed</DayHeader>
              <DayHeader>Thu</DayHeader>
              <DayHeader>Fri</DayHeader>
              <DayHeader>Sat</DayHeader>

              {generateCalendarDays(currentMonth).map((date, index) => {
                const priceData = getPriceForDate(date);
                const isCurrentMonth =
                  date.getMonth() === currentMonth.getMonth();
                const isSelected = isDateSelected(date);
                const isDeparture = isDepartureDate(date);
                const isReturn = isReturnDate(date);
                const inRange = isInRange(date);

                return (
                  <CalendarDay
                    key={index}
                    isCurrentMonth={isCurrentMonth}
                    isSelected={isSelected}
                    isDeparture={isDeparture}
                    isReturn={isReturn}
                    inRange={inRange}
                    onClick={() => isCurrentMonth && handleDateSelect(date)}
                    disabled={!isCurrentMonth}
                  >
                    <DayNumber>{date.getDate()}</DayNumber>
                    {priceData && (
                      <PriceTag color={getPriceColor(priceData.group)}>
                        ${Math.round(priceData.price)}
                      </PriceTag>
                    )}
                  </CalendarDay>
                );
              })}
            </CalendarGrid>
          </Calendar>

          {tripType === "Round trip" && (
            <Calendar>
              <CalendarHeader>
                <NextMonthArrow
                  className="prev-arrow"
                  onClick={() => navigateMonth("prev", true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 18l-6-6 6-6"
                    />
                  </svg>
                </NextMonthArrow>
                <MonthName>{getMonthName(nextMonth)}</MonthName>
                <NextMonthArrow onClick={() => navigateMonth("next", true)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </NextMonthArrow>
              </CalendarHeader>
              <CalendarGrid>
                <DayHeader>Sun</DayHeader>
                <DayHeader>Mon</DayHeader>
                <DayHeader>Tue</DayHeader>
                <DayHeader>Wed</DayHeader>
                <DayHeader>Thu</DayHeader>
                <DayHeader>Fri</DayHeader>
                <DayHeader>Sat</DayHeader>

                {generateCalendarDays(nextMonth).map((date, index) => {
                  const priceData = getPriceForDate(date);
                  const isCurrentMonth =
                    date.getMonth() === nextMonth.getMonth();
                  const isSelected = isDateSelected(date);
                  const isDeparture = isDepartureDate(date);
                  const isReturn = isReturnDate(date);
                  const inRange = isInRange(date);

                  return (
                    <CalendarDay
                      key={index}
                      isCurrentMonth={isCurrentMonth}
                      isSelected={isSelected}
                      isDeparture={isDeparture}
                      isReturn={isReturn}
                      inRange={inRange}
                      onClick={() => isCurrentMonth && handleDateSelect(date)}
                      disabled={!isCurrentMonth}
                    >
                      <DayNumber>{date.getDate()}</DayNumber>
                      {priceData && (
                        <PriceTag color={getPriceColor(priceData.group)}>
                          ${Math.round(priceData.price)}
                        </PriceTag>
                      )}
                    </CalendarDay>
                  );
                })}
              </CalendarGrid>
            </Calendar>
          )}
        </CalendarContainer>

        <Footer>
          <FooterRight>
            {totalPrice && (
              <TotalPrice>from ${Math.round(totalPrice)}</TotalPrice>
            )}
            <DoneButton onClick={onClose}>Done</DoneButton>
          </FooterRight>
        </Footer>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  min-width: max-content;
  max-width: 900px;
  max-height: 90vh;
  // overflow-y: auto;
  @media (max-width: 768px) {
    min-width: 90%;
    max-width: 90%;

    overflow: auto;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dadce0;
`;

const TripTypeSelector = styled.div`
  display: flex;
  align-items: center;
`;

const TripTypeDropdown = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #dadce0;
  border-radius: 0.25rem;
  cursor: pointer;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #202124;

  &:hover {
    border-color: #1a73e8;
  }
`;

const DropdownIcon = styled.div`
  width: 1rem;
  height: 1rem;
  color: #5f6368;
`;

const ResetButton = styled.button`
  background: none;
  border: none;
  color: #1a73e8;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const DateSelectors = styled.div`
  display: flex;
  gap: 2rem;
`;

const DateSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DateLabel = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.75rem;
  color: #5f6368;
`;

const DateValue = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: ${(props) => (props.selected ? "#1a73e8" : "transparent")};
  color: ${(props) => (props.selected ? "white" : "#202124")};
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 120px;
`;

const NavigationArrows = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #dadce0;
  border-radius: 0.125rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #1a73e8;
    background-color: #f8f9fa;
  }

  svg {
    width: 0.75rem;
    height: 0.75rem;
    color: #5f6368;
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Calendar = styled.div`
  flex: 1;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    position: relative;
  }
`;

const MonthName = styled.h3`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  color: #202124;
`;

const NextMonthArrow = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  color: #5f6368;
  cursor: pointer;
  // padding: 0.5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  position: absolute;
  top: 40%;
  right: -2.5rem;
  z-index: 10000;

  &:hover {
    color: #1a73e8;
  }

  &.prev-arrow {
    left: -2.5rem;
    right: auto;
  }

  @media (max-width: 768px) {
    position: relative;
    right: auto;
    left: auto;
    top: auto;
    margin: 0 0.5rem;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
`;

const DayHeader = styled.div`
  padding: 0.5rem;
  text-align: center;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: #5f6368;
`;

const CalendarDay = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: ${(props) => (props.isSelected ? "50%" : "0.25rem")};
  background: ${(props) => {
    if (props.isDeparture) return "#1a73e8";
    if (props.isReturn) return "transparent";
    if (props.inRange) return "#e8f0fe";
    if (props.isSelected) return "#e8f0fe";
    return "transparent";
  }};
  color: ${(props) => {
    if (props.isDeparture) return "white";
    if (!props.isCurrentMonth) return "#dadce0";
    return "#202124";
  }};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  transition: all 0.2s;
  min-height: 60px;
  min-width: 60px;
  &:hover:not(:disabled) {
    background-color: ${(props) => (props.isDeparture ? "#1557b0" : "#f8f9fa")};
    border-color: #1a73e8;
  }

  ${(props) =>
    props.isReturn &&
    `
    border: 2px solid #1a73e8;
  `}
`;

const DayNumber = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const PriceTag = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.625rem;
  font-weight: 500;
  color: ${(props) => props.color};
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #dadce0;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: flex-end;
`;

const TotalPrice = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #202124;
  font-weight: 500;
`;

const DoneButton = styled.button`
  background: #1a73e8;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1557b0;
  }
`;

export default DatePicker;
