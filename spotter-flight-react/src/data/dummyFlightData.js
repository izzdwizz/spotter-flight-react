// Dummy flight data based on the API response example
export const dummyFlightResponse = {
  status: true,
  timestamp: Date.now(),
  data: {
    itinerary: {
      legs: [
        {
          id: "13542-2402201235--30598-0-12712-2402201550",
          origin: {
            id: "13542",
            name: "London Gatwick",
            displayCode: "LGW",
            city: "London",
          },
          destination: {
            id: "12712",
            name: "New York John F. Kennedy",
            displayCode: "JFK",
            city: "New York",
          },
          segments: [
            {
              id: "13542-12712-2402201235-2402201550--30598",
              origin: {
                id: "13542",
                name: "London Gatwick",
                displayCode: "LGW",
                city: "London",
              },
              destination: {
                id: "12712",
                name: "New York John F. Kennedy",
                displayCode: "JFK",
                city: "New York",
              },
              duration: 495,
              dayChange: 0,
              flightNumber: "Z0701",
              departure: "2024-08-20T12:35:00",
              arrival: "2024-08-20T15:50:00",
              marketingCarrier: {
                id: "-30598",
                name: "Norse Atlantic Airways (UK)",
                displayCode: "Z0",
                displayCodeType: "IATA",
                logo: "https://logos.skyscnr.com/images/airlines/favicon/I).png",
                altId: "I)",
              },
              operatingCarrier: {
                id: "-30598",
                name: "Norse Atlantic Airways (UK)",
                displayCode: "Z0",
                displayCodeType: "IATA",
                logo: "https://logos.skyscnr.com/images/airlines/favicon/I).png",
                altId: "I)",
              },
            },
          ],
          duration: 495,
          stopCount: 0,
          departure: "2024-08-20T12:35:00",
          arrival: "2024-08-20T15:50:00",
          dayChange: 0,
        },
      ],
      pricingOptions: [
        {
          agents: [
            {
              id: "arus",
              name: "Mytrip",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/arus/flights",
              price: 270.99,
              rating: {
                value: 3.01,
                count: 9532,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 270.99,
        },
        {
          agents: [
            {
              id: "edus",
              name: "eDreams",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/edus/flights",
              price: 272.81,
              rating: {
                value: 2.63,
                count: 10415,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 272.81,
        },
        {
          agents: [
            {
              id: "xpus",
              name: "Expedia",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/xpus/flights",
              price: 277.98,
              rating: {
                value: 3.96,
                count: 12563,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 277.98,
        },
        {
          agents: [
            {
              id: "noaa",
              name: "Norse Atlantic Airways",
              isCarrier: true,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/noaa/flights",
              price: 277.98,
              rating: {
                value: 3.61,
                count: 689,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 277.98,
        },
        {
          agents: [
            {
              id: "orbz",
              name: "Orbitz",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/orbz/flights",
              price: 277.98,
              rating: {
                value: 1.89,
                count: 1882,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 277.98,
        },
        {
          agents: [
            {
              id: "bcom",
              name: "Booking.com",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/bcom/flights",
              price: 285.99,
              rating: {
                value: 3.63,
                count: 7583,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 285.99,
        },
        {
          agents: [
            {
              id: "skyp",
              name: "Kiwi.com",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/skyp/flights",
              price: 280.0,
              rating: {
                value: 2.92,
                count: 12352,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 280.0,
        },
      ],
      isTransferRequired: false,
      destinationImage:
        "https://content.skyscnr.com/b62fd4346123d1eb9f7525c8f72f2a8a/stock-photo-new-york-city-at-twilight-128894587.jpg",
      operatingCarrierSafetyAttributes: [
        {
          carrierID: "-30598",
          carrierName: "Norse Atlantic Airways (UK)",
          faceMasksCompulsory: null,
          aircraftDeepCleanedDaily: null,
          attendantsWearPPE: null,
          cleaningPacksProvided: null,
          foodServiceChanges: null,
          safetyUrl: null,
        },
      ],
      flexibleTicketPolicies: [],
    },
    pollingCompleted: true,
  },
};

// Round trip dummy data
export const dummyRoundTripFlightResponse = {
  status: true,
  timestamp: Date.now(),
  data: {
    itinerary: {
      legs: [
        {
          id: "13542-2402201235--30598-0-12712-2402201550",
          origin: {
            id: "13542",
            name: "London Gatwick",
            displayCode: "LGW",
            city: "London",
          },
          destination: {
            id: "12712",
            name: "New York John F. Kennedy",
            displayCode: "JFK",
            city: "New York",
          },
          segments: [
            {
              id: "13542-12712-2402201235-2402201550--30598",
              origin: {
                id: "13542",
                name: "London Gatwick",
                displayCode: "LGW",
                city: "London",
              },
              destination: {
                id: "12712",
                name: "New York John F. Kennedy",
                displayCode: "JFK",
                city: "New York",
              },
              duration: 495,
              dayChange: 0,
              flightNumber: "Z0701",
              departure: "2024-08-20T12:35:00",
              arrival: "2024-08-20T15:50:00",
              marketingCarrier: {
                id: "-30598",
                name: "Norse Atlantic Airways (UK)",
                displayCode: "Z0",
                displayCodeType: "IATA",
                logo: "https://logos.skyscnr.com/images/airlines/favicon/I).png",
                altId: "I)",
              },
              operatingCarrier: {
                id: "-30598",
                name: "Norse Atlantic Airways (UK)",
                displayCode: "Z0",
                displayCodeType: "IATA",
                logo: "https://logos.skyscnr.com/images/airlines/favicon/I).png",
                altId: "I)",
              },
            },
          ],
          duration: 495,
          stopCount: 0,
          departure: "2024-08-20T12:35:00",
          arrival: "2024-08-20T15:50:00",
          dayChange: 0,
        },
        {
          id: "12712-2402271430--30598-0-13542-2402272145",
          origin: {
            id: "12712",
            name: "New York John F. Kennedy",
            displayCode: "JFK",
            city: "New York",
          },
          destination: {
            id: "13542",
            name: "London Gatwick",
            displayCode: "LGW",
            city: "London",
          },
          segments: [
            {
              id: "12712-13542-2402271430-2402272145--30598",
              origin: {
                id: "12712",
                name: "New York John F. Kennedy",
                displayCode: "JFK",
                city: "New York",
              },
              destination: {
                id: "13542",
                name: "London Gatwick",
                displayCode: "LGW",
                city: "London",
              },
              duration: 435,
              dayChange: 1,
              flightNumber: "Z0702",
              departure: "2024-08-27T14:30:00",
              arrival: "2024-08-28T21:45:00",
              marketingCarrier: {
                id: "-30598",
                name: "Norse Atlantic Airways (UK)",
                displayCode: "Z0",
                displayCodeType: "IATA",
                logo: "https://logos.skyscnr.com/images/airlines/favicon/I).png",
                altId: "I)",
              },
              operatingCarrier: {
                id: "-30598",
                name: "Norse Atlantic Airways (UK)",
                displayCode: "Z0",
                displayCodeType: "IATA",
                logo: "https://logos.skyscnr.com/images/airlines/favicon/I).png",
                altId: "I)",
              },
            },
          ],
          duration: 435,
          stopCount: 0,
          departure: "2024-08-27T14:30:00",
          arrival: "2024-08-28T21:45:00",
          dayChange: 1,
        },
      ],
      pricingOptions: [
        {
          agents: [
            {
              id: "arus",
              name: "Mytrip",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/arus/flights",
              price: 541.98,
              rating: {
                value: 3.01,
                count: 9532,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 541.98,
        },
        {
          agents: [
            {
              id: "edus",
              name: "eDreams",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/edus/flights",
              price: 545.62,
              rating: {
                value: 2.63,
                count: 10415,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 545.62,
        },
        {
          agents: [
            {
              id: "xpus",
              name: "Expedia",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/xpus/flights",
              price: 555.96,
              rating: {
                value: 3.96,
                count: 12563,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 555.96,
        },
        {
          agents: [
            {
              id: "bcom",
              name: "Booking.com",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/bcom/flights",
              price: 571.98,
              rating: {
                value: 3.63,
                count: 7583,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 571.98,
        },
      ],
      isTransferRequired: false,
      destinationImage:
        "https://content.skyscnr.com/b62fd4346123d1eb9f7525c8f72f2a8a/stock-photo-new-york-city-at-twilight-128894587.jpg",
      operatingCarrierSafetyAttributes: [
        {
          carrierID: "-30598",
          carrierName: "Norse Atlantic Airways (UK)",
          faceMasksCompulsory: null,
          aircraftDeepCleanedDaily: null,
          attendantsWearPPE: null,
          cleaningPacksProvided: null,
          foodServiceChanges: null,
          safetyUrl: null,
        },
      ],
      flexibleTicketPolicies: [],
    },
    pollingCompleted: true,
  },
};

// Additional flight option with stops
export const dummyFlightWithStops = {
  status: true,
  timestamp: Date.now(),
  data: {
    itinerary: {
      legs: [
        {
          id: "13542-2402201000--32645-1-12712-2402202030",
          origin: {
            id: "13542",
            name: "London Gatwick",
            displayCode: "LGW",
            city: "London",
          },
          destination: {
            id: "12712",
            name: "New York John F. Kennedy",
            displayCode: "JFK",
            city: "New York",
          },
          segments: [
            {
              id: "13542-27547-2402201000-2402201145--32645",
              origin: {
                id: "13542",
                name: "London Gatwick",
                displayCode: "LGW",
                city: "London",
              },
              destination: {
                id: "27547",
                name: "Dublin",
                displayCode: "DUB",
                city: "Dublin",
              },
              duration: 105,
              dayChange: 0,
              flightNumber: "EI240",
              departure: "2024-08-20T10:00:00",
              arrival: "2024-08-20T11:45:00",
              marketingCarrier: {
                id: "-32645",
                name: "Aer Lingus",
                displayCode: "EI",
                displayCodeType: "IATA",
                logo: "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                altId: "EI",
              },
              operatingCarrier: {
                id: "-32645",
                name: "Aer Lingus",
                displayCode: "EI",
                displayCodeType: "IATA",
                logo: "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                altId: "EI",
              },
            },
            {
              id: "27547-12712-2402201445-2402202030--32645",
              origin: {
                id: "27547",
                name: "Dublin",
                displayCode: "DUB",
                city: "Dublin",
              },
              destination: {
                id: "12712",
                name: "New York John F. Kennedy",
                displayCode: "JFK",
                city: "New York",
              },
              duration: 465,
              dayChange: 0,
              flightNumber: "EI104",
              departure: "2024-08-20T14:45:00",
              arrival: "2024-08-20T20:30:00",
              marketingCarrier: {
                id: "-32645",
                name: "Aer Lingus",
                displayCode: "EI",
                displayCodeType: "IATA",
                logo: "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                altId: "EI",
              },
              operatingCarrier: {
                id: "-32645",
                name: "Aer Lingus",
                displayCode: "EI",
                displayCodeType: "IATA",
                logo: "https://logos.skyscnr.com/images/airlines/favicon/EI.png",
                altId: "EI",
              },
            },
          ],
          duration: 630,
          stopCount: 1,
          departure: "2024-08-20T10:00:00",
          arrival: "2024-08-20T20:30:00",
          dayChange: 0,
        },
      ],
      pricingOptions: [
        {
          agents: [
            {
              id: "arus",
              name: "Mytrip",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/arus/flights",
              price: 410.5,
              rating: {
                value: 3.01,
                count: 9532,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 410.5,
        },
        {
          agents: [
            {
              id: "edus",
              name: "eDreams",
              isCarrier: false,
              bookingProposition: "PBOOK",
              url: "https://www.skyscanner.net/transport_deeplink/4.0/US/en-US/USD/edus/flights",
              price: 425.3,
              rating: {
                value: 2.63,
                count: 10415,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 425.3,
        },
        {
          agents: [
            {
              id: "aer",
              name: "Aer Lingus",
              isCarrier: true,
              bookingProposition: "PBOOK",
              url: "https://www.aerlingus.com/",
              price: 435.0,
              rating: {
                value: 4.1,
                count: 3245,
              },
              updateStatus: "CURRENT",
              isDirectDBookUrl: false,
              quoteAge: 3,
            },
          ],
          totalPrice: 435.0,
        },
      ],
      isTransferRequired: false,
      destinationImage:
        "https://content.skyscnr.com/b62fd4346123d1eb9f7525c8f72f2a8a/stock-photo-new-york-city-at-twilight-128894587.jpg",
    },
    pollingCompleted: true,
  },
};

// Array of different dummy flights to simulate multiple results
export const dummyFlightOptions = [
  dummyFlightResponse,
  dummyFlightWithStops,
  dummyRoundTripFlightResponse,
];

// Function to get dummy data based on trip type
export const getDummyFlightData = (tripType = "Round trip") => {
  return tripType === "Round trip"
    ? dummyRoundTripFlightResponse
    : dummyFlightResponse;
};

// Function to get multiple flight options
export const getDummyFlightOptions = (tripType = "Round trip", count = 2) => {
  const baseOptions =
    tripType === "Round trip"
      ? [dummyRoundTripFlightResponse]
      : [dummyFlightResponse, dummyFlightWithStops];

  return baseOptions.slice(0, count);
};
