import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Chip,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Alert,
  IconButton,
  Collapse,
  Paper,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  FlightTakeoff,
  FlightLand,
  AccessTime,
  Nature,
  Warning,
  Info,
  AirlineSeatReclineNormal,
  Power,
  Wifi,
  LiveTv,
  Circle,
} from "@mui/icons-material";

const FlightCard = ({ itinerary }) => {
  const [expanded, setExpanded] = useState(false);
  const [showBookingOptions, setShowBookingOptions] = useState(false);

  if (!itinerary) return null;

  const { legs, pricingOptions } = itinerary;
  const mainLeg = legs[0]; // First leg (outbound)
  const returnLeg = legs[1]; // Return leg if exists

  // Get the cheapest price
  const cheapestPrice =
    pricingOptions?.length > 0
      ? Math.min(...pricingOptions.map((option) => option.totalPrice))
      : null;

  // Format duration
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hr ${mins > 0 ? `${mins} min` : ""}`;
  };

  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate emissions (dummy data for now)
  const calculateEmissions = (duration) => {
    return Math.floor(duration * 10 + Math.random() * 1000); // Dummy calculation
  };

  // Get stop information
  const getStopInfo = (leg) => {
    if (leg.stopCount === 0) return "Nonstop";
    return `${leg.stopCount} stop${leg.stopCount > 1 ? "s" : ""}`;
  };

  // Get emissions percentage (dummy)
  const getEmissionsPercentage = () => {
    return Math.floor(Math.random() * 30) - 15; // -15% to +15%
  };

  // Get layover info
  const getLayoverInfo = (leg) => {
    if (leg.stopCount === 0) return null;
    // For demo purposes, generate some layover data
    const layoverTime = "10 hr 45 min";
    const layoverAirport = "LOS";
    return `${layoverTime} layover • Lagos (${layoverAirport})`;
  };

  const handleBookNow = (agent) => {
    if (agent.url) {
      window.open(agent.url, "_blank");
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Render detailed flight segment
  const renderFlightSegment = (segment, isLayover = false) => (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "flex-start" },
          gap: { xs: 1, md: 2 },
        }}
      >
        {/* Timeline - Only show on desktop */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            pt: 1,
          }}
        >
          <Circle sx={{ fontSize: 8, color: "grey.400" }} />
          {!isLayover && (
            <>
              <Box sx={{ width: 2, height: 60, bgcolor: "grey.300", my: 1 }} />
              <Circle sx={{ fontSize: 8, color: "grey.400" }} />
            </>
          )}
        </Box>

        {/* Main Content Container */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, md: 2 },
          }}
        >
          {/* Flight Info */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: { xs: 0.5, sm: 2 },
                mb: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                {formatTime(segment.departure)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
              >
                {segment.origin.name} ({segment.origin.displayCode})
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1,
                fontSize: { xs: "0.75rem", md: "0.875rem" },
              }}
            >
              Travel time: {formatDuration(segment.duration)}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              {formatTime(segment.arrival)}
              {segment.dayChange > 0 && (
                <Typography
                  component="sup"
                  sx={{ fontSize: "0.75rem", color: "error.main" }}
                >
                  +{segment.dayChange}
                </Typography>
              )}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                fontSize: { xs: "0.75rem", md: "0.875rem" },
              }}
            >
              {segment.destination.name} ({segment.destination.displayCode})
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                src={segment.marketingCarrier.logo}
                alt={segment.marketingCarrier.name}
                sx={{ width: 24, height: 24 }}
              />
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
              >
                {segment.marketingCarrier.name} • Business Class •{" "}
                {segment.marketingCarrier.displayCode}{" "}
                {segment.flightNumber.slice(2)}
              </Typography>
            </Box>
          </Box>

          {/* Right side info */}
          <Box
            sx={{
              textAlign: { xs: "left", md: "right" },
              minWidth: { xs: "auto", md: 200 },
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Stack
              spacing={1}
              direction={{ xs: "row", md: "column" }}
              alignItems={{ xs: "flex-start", md: "flex-end" }}
              flexWrap={{ xs: "wrap", md: "nowrap" }}
              useFlexGap
            >
              <Chip
                icon={<AirlineSeatReclineNormal />}
                label="Standard recliner seat"
                size="small"
                variant="outlined"
                sx={{
                  fontSize: { xs: "0.625rem", md: "0.75rem" },
                  height: { xs: "24px", md: "28px" },
                }}
              />
              <Chip
                icon={<Nature />}
                label="Emissions estimate: 386 kg CO2e"
                size="small"
                variant="outlined"
                sx={{
                  fontSize: { xs: "0.625rem", md: "0.75rem" },
                  height: { xs: "24px", md: "28px" },
                }}
              />
              <Chip
                icon={<Warning />}
                label="Contrail warming potential: Low"
                size="small"
                variant="outlined"
                color="warning"
                sx={{
                  fontSize: { xs: "0.625rem", md: "0.75rem" },
                  height: { xs: "24px", md: "28px" },
                }}
              />
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Layover info */}
      {getLayoverInfo(mainLeg) && !isLayover && (
        <Box sx={{ ml: 4, mt: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {getLayoverInfo(mainLeg)}
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 1,
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 1,
      }}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleAccordionChange("panel1")}
        elevation={0}
        sx={{
          "&:before": { display: "none" },
          boxShadow: "none",
        }}
      >
        {/* Compact Summary View */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            padding: "16px 20px",
            minHeight: "80px",
            "&.Mui-expanded": {
              minHeight: "80px",
            },
            "& .MuiAccordionSummary-content": {
              margin: "12px 0",
              width: "100%",
              "&.Mui-expanded": {
                margin: "12px 0",
              },
            },
            "& .MuiAccordionSummary-expandIconWrapper": {
              marginLeft: "auto",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: { xs: 2, sm: 3, md: 4 },
              flexDirection: { md: "row" },
              "@media (max-width: 400px)": {
                flexDirection: "column",
                alignItems: "flex-start",
              },
            }}
          >
            {/* First Div: Logo + Flight Times + Airline */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flex: "1",
                minWidth: 0,
              }}
            >
              {/* Airline Logo */}
              <Avatar
                src={mainLeg.segments[0]?.marketingCarrier?.logo}
                alt={mainLeg.segments[0]?.marketingCarrier?.name}
                sx={{ width: 40, height: 40, flexShrink: 0 }}
              />

              {/* Flight Times + Airline */}
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    lineHeight: 1.2,
                  }}
                >
                  {formatTime(mainLeg.departure)} –{" "}
                  {formatTime(mainLeg.arrival)}
                  {mainLeg.dayChange > 0 && (
                    <Typography
                      component="sup"
                      sx={{ fontSize: "0.75rem", color: "error.main" }}
                    >
                      +{mainLeg.dayChange}
                    </Typography>
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.2 }}
                >
                  {mainLeg.segments[0]?.marketingCarrier?.name || "Air Peace"}
                </Typography>
              </Box>
            </Box>

            {/* Second Div (Middle): Duration + Route */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                flex: "1",
                minWidth: 0,
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, lineHeight: 1.2 }}
              >
                {formatDuration(mainLeg.duration)}
              </Typography>
              {/* Stops Info */}
              <Box sx={{ textAlign: { xs: "left", md: "right", py: 2 } }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, lineHeight: 1.2 }}
                >
                  {getStopInfo(mainLeg)}
                </Typography>
                {mainLeg.stopCount > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      justifyContent: { xs: "flex-start", md: "flex-end" },
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.2 }}
                    >
                      {getLayoverInfo(mainLeg)}
                    </Typography>
                    {mainLeg.stopCount > 1 && (
                      <Warning sx={{ fontSize: 16, color: "warning.main" }} />
                    )}
                  </Box>
                )}
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.2 }}
              >
                {mainLeg.origin.displayCode} – {mainLeg.destination.displayCode}
              </Typography>
            </Box>

            {/* Third Div: Stops + Emissions + Price */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                alignItems: { xs: "center", md: "flex-end" },
                justifyContent: { xs: "space-between", md: "flex-end" },
                textAlign: { xs: "left", md: "right" },
                flex: "1",
                gap: { xs: 2, md: 1 },
                minWidth: 0,
              }}
            >
              {/* Emissions + Price */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "column" },
                  alignItems: { xs: "flex-end", md: "flex-end" },
                  textAlign: "right",
                  gap: { xs: 0, md: 0.5 },
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.2, fontSize: "0.75rem" }}
                  >
                    {calculateEmissions(mainLeg.duration)} kg CO2e
                  </Typography>
                  <Typography
                    variant="body2"
                    color="success.main"
                    sx={{ lineHeight: 1.2, fontSize: "0.75rem" }}
                  >
                    {getEmissionsPercentage()}% emissions
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "success.main",
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    lineHeight: 1.2,
                  }}
                >
                  ${cheapestPrice?.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </AccordionSummary>

        {/* Detailed Expanded View */}
        <AccordionDetails
          sx={{ padding: 0, borderTop: "1px solid", borderColor: "grey.200" }}
        >
          <Box sx={{ p: 3 }}>
            {/* Flight Header */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: { xs: "flex-start", md: "space-between" },
                alignItems: { xs: "flex-start", md: "center" },
                gap: { xs: 2, md: 0 },
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  src={mainLeg.segments[0]?.marketingCarrier?.logo}
                  alt={mainLeg.segments[0]?.marketingCarrier?.name}
                  sx={{ width: 24, height: 24 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Departure • {formatDate(mainLeg.departure)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, md: 2 },
                  flexWrap: { xs: "wrap", md: "nowrap" },
                  width: { xs: "100%", md: "auto" },
                  justifyContent: { xs: "space-between", md: "flex-end" },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  }}
                >
                  {calculateEmissions(mainLeg.duration)} kg CO2e
                </Typography>
                <Chip
                  label="-11% emissions"
                  size="small"
                  color="success"
                  variant="outlined"
                />
                <Info sx={{ fontSize: 16, color: "action.active" }} />
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: "3rem",
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                    padding: { xs: "4px 12px", md: "6px 16px" },
                  }}
                  onClick={() => alert("Routing to booking page")}
                >
                  Select flight
                </Button>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "success.main",
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  ${cheapestPrice?.toLocaleString()}
                </Typography>
              </Box>
            </Box>

            {/* Detailed Flight Information */}
            {mainLeg.segments.map((segment, index) => (
              <React.Fragment key={segment.id}>
                {renderFlightSegment(segment)}
                {index < mainLeg.segments.length - 1 && (
                  <Box sx={{ ml: 4, mb: 2 }}>
                    <Divider />
                  </Box>
                )}
              </React.Fragment>
            ))}

            {/* Return Flight (if exists) */}
            {returnLeg && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Return • {formatDate(returnLeg.departure)}
                </Typography>
                {returnLeg.segments.map((segment, index) => (
                  <React.Fragment key={segment.id}>
                    {renderFlightSegment(segment)}
                    {index < returnLeg.segments.length - 1 && (
                      <Box sx={{ ml: 4, mb: 2 }}>
                        <Divider />
                      </Box>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}

            {/* Flight Amenities */}
            <Box sx={{ mt: 3, ml: { xs: 0, md: 4 } }}>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{ gap: { xs: 0.5, md: 1 } }}
              >
                <Chip
                  icon={<AirlineSeatReclineNormal />}
                  label="Angled flat seat"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  icon={<Power />}
                  label="In-seat power & USB outlets"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  icon={<LiveTv />}
                  label="On-demand video"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  icon={<Nature />}
                  label="Emissions estimate: 5,857 kg CO2e"
                  size="small"
                  variant="outlined"
                />
                <Chip
                  icon={<Warning />}
                  label="Contrail warming potential: Low"
                  size="small"
                  variant="outlined"
                  color="warning"
                />
              </Stack>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default FlightCard;
