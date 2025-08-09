import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Hero from "./components/Hero";
import FlightSearch from "./components/FlightSearch";
import FlightExploration from "./components/FlightExploration";
import TravelContent from "./components/TravelContent";
import AppLayout from "./components/Layout/AppLayout";
import { FlightProvider } from "./context/FlightContext";
import CustomToast from "./components/CustomToast/CustomToast";
import FlightResults from "./components/FlightResults";
import Footer from "./components/Layout/Footer";

const HomePage = () => (
  <>
    <Hero />
    <FlightSearch />
    <FlightExploration />
    <TravelContent />
    <Footer />
  </>
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Google Sans", "Roboto", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FlightProvider>
        <Router>
          <AppLayout>
            <CustomToast />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/flights/:searchId" element={<FlightResults />} />
            </Routes>
          </AppLayout>
        </Router>
      </FlightProvider>
    </ThemeProvider>
  );
}

export default App;
