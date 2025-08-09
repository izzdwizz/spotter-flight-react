# ✈️ Spotter Flight React

A modern, responsive flight search and booking application built with React and Material-UI, inspired by Google Flights.
<img width="1440" height="780" alt="Screenshot 2025-08-09 at 4 20 16 PM" src="https://github.com/user-attachments/assets/85c286f5-8558-4b88-a716-04ba8b94a2a3" />


## 🚀 Features

- **🔍 Flight Search**: Advanced search with origin/destination airports, dates, and passenger selection
- **📅 Interactive Calendar**: Visual date picker with price display and responsive design
- **🎯 Smart Filters**: Responsive filter system with dropdown on mobile, buttons on desktop
- **✈️ Flight Results**: Detailed flight cards with accordion-style expandable views
- **📱 Fully Responsive**: Optimized for all screen sizes from mobile to desktop
- **🎨 Modern UI**: Material-UI components with custom styling and animations
- **🛣️ Dynamic Routing**: React Router for seamless navigation between pages
- **🍪 State Persistence**: Cookie-based storage for search preferences
- **🔄 Real-time Updates**: Live search suggestions and interactive components

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 19.1.0** - Latest React with modern hooks and concurrent features
- **Vite 7.0.4** - Lightning-fast build tool with HMR

### **UI & Styling**

- **Material-UI 7.3.1** - Modern React component library
- **Styled Components 6.1.19** - CSS-in-JS styling solution
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Emotion** - Performant styling library for Material-UI

### **State Management & Navigation**

- **React Router DOM 7.8.0** - Declarative routing for React
- **React Context API** - Built-in state management for global data

### **Date & Time Handling**

- **React DatePicker 8.4.0** - Flexible date picker component
- **JS Cookie 3.0.5** - Lightweight cookie handling library

### **Development Tools**

- **ESLint 9.30.1** - Code linting and formatting
- **PostCSS 8.5.6** - CSS post-processing
- **Autoprefixer 10.4.21** - Automatic vendor prefixing

### **Icons & Assets**

- **Material-UI Icons 7.3.1** - Comprehensive icon library
- **Custom SVG Assets** - Branded illustrations and graphics

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/spotter-flight-react.git
   cd spotter-flight-react/spotter-flight-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
spotter-flight-react/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── AppLayout.jsx       # Main app layout
│   │   │   └── Navbar.jsx          # Navigation component
│   │   ├── CustomToast/            # Toast notification system
│   │   ├── AirportSearchDropdown.jsx  # Airport search input
│   │   ├── DatePicker.jsx          # Interactive calendar
│   │   ├── EditableSearchSummary.jsx  # Interactive search form
│   │   ├── FlightCard.jsx          # Flight result card
│   │   ├── FlightExploration.jsx   # Flight discovery section
│   │   ├── FlightResults.jsx       # Search results page
│   │   ├── FlightSearch.jsx        # Main search form
│   │   ├── Hero.jsx                # Landing page hero
│   │   ├── PassengerSelector.jsx   # Passenger count selector
│   │   └── TravelContent.jsx       # Travel inspiration content
│   ├── context/
│   │   └── FlightContext.jsx       # Global flight state
│   ├── data/
│   │   └── dummyFlightData.js      # Mock flight data
│   ├── state/
│   │   └── store.js                # Redux store configuration
│   ├── utils/
│   │   └── cookieManager.js        # Cookie utilities
│   ├── assets/                     # Images and icons
│   ├── App.jsx                     # Main app component
│   └── main.jsx                    # App entry point
├── public/                         # Static assets
├── package.json                    # Project dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
└── README.md                       # Project documentation
```

## 🎯 Key Components

### **FlightSearch**

Main search form with origin/destination selection, date picking, and passenger configuration.

### **DatePicker**

Interactive calendar with price display, responsive design, and navigation controls.

### **FlightResults**

Dynamic results page with filtering, sorting, and detailed flight information.

### **FlightCard**

Accordion-style flight display with expandable details, amenities, and booking options.

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices with progressive enhancement
- **Breakpoints**:
  - Mobile: `< 480px`
  - Tablet: `480px - 768px`
  - Desktop: `768px - 1024px`
  - Large Desktop: `> 1024px`
- **Adaptive Components**: All components adjust layout and functionality based on screen size

## 🛠️ Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint code analysis

## 🔧 Configuration

### **Environment Variables**

Create a `.env` file in the root directory:

```env
VITE_RAPIDAPI_KEY=your_api_key_here
VITE_API_BASE_URL=your_api_base_url
```

### **Vite Configuration**

The project uses Vite for fast development and optimized builds with React plugin support.

### **Material-UI Theme**

Custom theme configuration with brand colors, typography, and component overrides.

## 🚀 Deployment

1. **Build the project**

   ```bash
   npm run build
   ```


