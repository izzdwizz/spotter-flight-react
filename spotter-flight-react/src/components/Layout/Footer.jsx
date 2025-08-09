import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Stack,
  Grid,
  Link,
  Chip,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import {
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  AttachMoney as CurrencyIcon,
  ExpandMore as ExpandMoreIcon,
  Public as GlobeIcon,
  Flight as FlightIcon,
} from "@mui/icons-material";

const Footer = () => {
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [locationAnchor, setLocationAnchor] = useState(null);
  const [currencyAnchor, setCurrencyAnchor] = useState(null);
  const [internationalSitesAnchor, setInternationalSitesAnchor] =
    useState(null);
  const [exploreFlightsAnchor, setExploreFlightsAnchor] = useState(null);

  const handleLanguageClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLocationClick = (event) => {
    setLocationAnchor(event.currentTarget);
  };

  const handleCurrencyClick = (event) => {
    setCurrencyAnchor(event.currentTarget);
  };

  const handleInternationalSitesClick = (event) => {
    setInternationalSitesAnchor(event.currentTarget);
  };

  const handleExploreFlightsClick = (event) => {
    setExploreFlightsAnchor(event.currentTarget);
  };

  const handleCloseAll = () => {
    setLanguageAnchor(null);
    setLocationAnchor(null);
    setCurrencyAnchor(null);
    setInternationalSitesAnchor(null);
    setExploreFlightsAnchor(null);
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "transparent",
        py: 4,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Language, Location, Currency Controls */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Chip
            icon={<GlobeIcon />}
            label="Language · English (United States)"
            onClick={handleLanguageClick}
            clickable
            variant="outlined"
            sx={{
              borderRadius: "20px",
              px: 2,
              py: 1,
              fontSize: "0.875rem",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          />
          <Chip
            icon={<LocationIcon />}
            label="Location · United States"
            onClick={handleLocationClick}
            clickable
            variant="outlined"
            sx={{
              borderRadius: "20px",
              px: 2,
              py: 1,
              fontSize: "0.875rem",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          />
          <Chip
            icon={<CurrencyIcon />}
            label="Currency · USD"
            onClick={handleCurrencyClick}
            clickable
            variant="outlined"
            sx={{
              borderRadius: "20px",
              px: 2,
              py: 1,
              fontSize: "0.875rem",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          />
        </Stack>

        {/* Currency Notice */}
        <Box sx={{ textAlign: "center", mb: 4, px: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Current language and currency options applied: English (United
            States) - United States - USD
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Displayed currencies may differ from the currencies used to purchase
            flights.{" "}
            <Link
              href="#"
              color="primary"
              sx={{
                textDecoration: "underline",
                "&:hover": {
                  textDecoration: "none",
                },
              }}
            >
              Learn more
            </Link>
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Footer Links */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 3 }}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 4 }}
          flexWrap="wrap"
        >
          {[
            "About",
            "Privacy",
            "Terms",
            "Join user studies",
            "Feedback",
            "Help Center",
          ].map((link) => (
            <Link
              key={link}
              href="#"
              color="primary"
              underline="hover"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 400,
                py: 0.5,
              }}
            >
              {link}
            </Link>
          ))}
        </Stack>

        {/* Dropdown Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            onClick={handleInternationalSitesClick}
            endIcon={<ExpandMoreIcon />}
            variant="text"
            color="primary"
            sx={{
              fontSize: "0.875rem",
              textTransform: "none",
              fontWeight: 400,
            }}
          >
            International sites
          </Button>
          <Button
            onClick={handleExploreFlightsClick}
            endIcon={<ExpandMoreIcon />}
            variant="text"
            color="primary"
            sx={{
              fontSize: "0.875rem",
              textTransform: "none",
              fontWeight: 400,
            }}
          >
            Explore flights
          </Button>
        </Stack>

        {/* Menus */}
        <Menu
          anchorEl={languageAnchor}
          open={Boolean(languageAnchor)}
          onClose={handleCloseAll}
          PaperProps={{
            sx: { minWidth: 200 },
          }}
        >
          <MenuItem onClick={handleCloseAll}>English (United States)</MenuItem>
          <MenuItem onClick={handleCloseAll}>English (United Kingdom)</MenuItem>
          <MenuItem onClick={handleCloseAll}>Español</MenuItem>
          <MenuItem onClick={handleCloseAll}>Français</MenuItem>
          <MenuItem onClick={handleCloseAll}>Deutsch</MenuItem>
        </Menu>

        <Menu
          anchorEl={locationAnchor}
          open={Boolean(locationAnchor)}
          onClose={handleCloseAll}
          PaperProps={{
            sx: { minWidth: 200 },
          }}
        >
          <MenuItem onClick={handleCloseAll}>United States</MenuItem>
          <MenuItem onClick={handleCloseAll}>United Kingdom</MenuItem>
          <MenuItem onClick={handleCloseAll}>Canada</MenuItem>
          <MenuItem onClick={handleCloseAll}>Australia</MenuItem>
          <MenuItem onClick={handleCloseAll}>Germany</MenuItem>
        </Menu>

        <Menu
          anchorEl={currencyAnchor}
          open={Boolean(currencyAnchor)}
          onClose={handleCloseAll}
          PaperProps={{
            sx: { minWidth: 150 },
          }}
        >
          <MenuItem onClick={handleCloseAll}>USD</MenuItem>
          <MenuItem onClick={handleCloseAll}>EUR</MenuItem>
          <MenuItem onClick={handleCloseAll}>GBP</MenuItem>
          <MenuItem onClick={handleCloseAll}>CAD</MenuItem>
          <MenuItem onClick={handleCloseAll}>AUD</MenuItem>
        </Menu>

        <Menu
          anchorEl={internationalSitesAnchor}
          open={Boolean(internationalSitesAnchor)}
          onClose={handleCloseAll}
          PaperProps={{
            sx: { minWidth: 250 },
          }}
        >
          <MenuItem onClick={handleCloseAll}>Google Flights (US)</MenuItem>
          <MenuItem onClick={handleCloseAll}>Google Flights (UK)</MenuItem>
          <MenuItem onClick={handleCloseAll}>Google Flights (Canada)</MenuItem>
          <MenuItem onClick={handleCloseAll}>
            Google Flights (Australia)
          </MenuItem>
          <MenuItem onClick={handleCloseAll}>Google Flights (India)</MenuItem>
        </Menu>

        <Menu
          anchorEl={exploreFlightsAnchor}
          open={Boolean(exploreFlightsAnchor)}
          onClose={handleCloseAll}
          PaperProps={{
            sx: { minWidth: 200 },
          }}
        >
          <MenuItem onClick={handleCloseAll}>Cheap flights</MenuItem>
          <MenuItem onClick={handleCloseAll}>Flight deals</MenuItem>
          <MenuItem onClick={handleCloseAll}>Last-minute flights</MenuItem>
          <MenuItem onClick={handleCloseAll}>Round-trip flights</MenuItem>
          <MenuItem onClick={handleCloseAll}>One-way flights</MenuItem>
        </Menu>
      </Container>
    </Box>
  );
};

export default Footer;
