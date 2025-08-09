import React, { useState } from "react";
import styled from "styled-components";

const TravelContent = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const popularDestinations = [
    {
      name: "London",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&h=200&fit=crop",
    },
    {
      name: "Lagos",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    },
    {
      name: "Abuja",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    },
    {
      name: "Kano",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    },
    {
      name: "Owerri",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    },
    {
      name: "Asaba",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    },
    {
      name: "Accra",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    },
  ];

  const faqData = [
    {
      question: "How can I find last-minute flight deals?",
      answer:
        "You can find last-minute deals by checking our deals page regularly, setting up price alerts, and being flexible with your travel dates and destinations.",
    },
    {
      question: "How can I find cheap flights for a weekend getaway?",
      answer:
        "For weekend getaways, try searching for flights departing on Thursday or Friday and returning on Sunday or Monday. Also consider nearby airports and alternative destinations.",
    },
    {
      question: "How can I find flight deals if my travel plans are flexible?",
      answer:
        "Use our flexible search options to explore different dates, nearby airports, and alternative destinations. Our price calendar shows the cheapest days to fly.",
    },
    {
      question: "How can I find cheap flights to anywhere?",
      answer:
        "Use our 'Explore' feature to discover destinations with the best prices. You can search by region, budget, or travel dates to find affordable options.",
    },
    {
      question: "How can I get flight alerts for my trip?",
      answer:
        "Set up price alerts for your desired route and we'll notify you when prices drop. You can also track specific flights or routes to get the best deals.",
    },
  ];

  const popularRoutes = [
    // Column 1
    [
      "New York to London",
      "New York to Rome",
      "Toronto to London",
      "London to Tokyo",
      "New York to Los Angeles",
      "London to Istanbul",
      "London to Berlin",
    ],
    // Column 2
    [
      "New York to Paris",
      "Montreal to Paris",
      "New York to Milan",
      "Madrid to Rome",
      "Paris to Marrakech",
      "Paris to Bangkok",
      "Chicago to Paris",
    ],
    // Column 3
    [
      "London to Paris",
      "London to Milan",
      "London to Dubai",
      "London to Delhi",
      "Sao Paulo to London",
      "New York to Orlando",
      "Melbourne to London",
    ],
  ];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      <Container>
        {/* Popular Destinations Section */}
        <Section>
          <SectionTitle>Popular destinations from Enugu</SectionTitle>
          <DestinationsCarousel>
            {popularDestinations.map((destination, index) => (
              <DestinationCard key={index}>
                <DestinationImage
                  src={destination.image}
                  alt={destination.name}
                />
                <DestinationName>{destination.name}</DestinationName>
              </DestinationCard>
            ))}
          </DestinationsCarousel>
        </Section>

        {/* FAQ Section */}
        <Section>
          <SectionTitle>Frequently asked questions</SectionTitle>
          <FaqContainer>
            {faqData.map((faq, index) => (
              <FaqItem key={index}>
                <FaqQuestion onClick={() => toggleFaq(index)}>
                  {faq.question}
                  <ChevronIcon expanded={expandedFaq === index}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </ChevronIcon>
                </FaqQuestion>
                <FaqAnswer expanded={expandedFaq === index}>
                  {faq.answer}
                </FaqAnswer>
              </FaqItem>
            ))}
          </FaqContainer>
        </Section>

        {/* Popular Routes Section */}
        <PopularRoutesWrapper>
          <Section>
            <SectionTitle>Find cheap flights on popular routes</SectionTitle>
            <RoutesGrid>
              {popularRoutes.map((column, columnIndex) => (
                <RouteColumn key={columnIndex}>
                  {column.map((route, routeIndex) => (
                    <RouteLink key={routeIndex} href="#">
                      Flights from {route}
                    </RouteLink>
                  ))}
                </RouteColumn>
              ))}
            </RoutesGrid>
          </Section>
        </PopularRoutesWrapper>
      </Container>
    </>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const PopularRoutesWrapper = styled.div`
  line-height: 1.5rem;
  border-bottom: 1px solid #dadce0;
`;

const SectionTitle = styled.h2`
  font-family: "Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin-bottom: 1.5rem;
`;

const DestinationsCarousel = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
`;

const DestinationCard = styled.div`
  min-width: 200px;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-2px);
  }
`;

const DestinationImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DestinationName = styled.div`
  padding: 1rem;
  background: transparent;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  position: absolute;
  bottom: 1px;
  text-align: center;
`;

const FaqContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FaqItem = styled.div`
  border-bottom: 1px solid #dadce0;
  overflow: hidden;
`;

const FaqQuestion = styled.button`
  width: 100%;
  padding: 1rem 0;
  background: white;
  border: none;
  text-align: left;
  font-family: "Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #202124;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ChevronIcon = styled.div`
  width: 1rem;
  height: 1rem;
  color: #5f6368;
  transition: transform 0.2s;
  transform: ${(props) => (props.expanded ? "rotate(180deg)" : "rotate(0deg)")};

  svg {
    width: 100%;
    height: 100%;
  }
`;

const FaqAnswer = styled.div`
  padding: ${(props) => (props.expanded ? "1rem 1.5rem" : "0 1.5rem")};
  max-height: ${(props) => (props.expanded ? "200px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #5f6368;
  line-height: 1.5;
`;

const RoutesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const RouteColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RouteLink = styled.a`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #1a73e8;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #1557b0;
    text-decoration: underline;
  }
`;

const FooterSection = styled.div`
  margin-top: 4rem;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #dadce0;
  margin: 1.5rem 0;
`;

const FooterControls = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #5f6368;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #202124;
  }
`;

const GlobeIcon = styled.div`
  width: 1rem;
  height: 1rem;
  color: #5f6368;
`;

const LocationIcon = styled.div`
  width: 1rem;
  height: 1rem;
  color: #5f6368;
`;

const CurrencyIcon = styled.div`
  width: 1rem;
  height: 1rem;
  color: #5f6368;
`;

const FooterInfo = styled.p`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.75rem;
  color: #5f6368;
  line-height: 1.4;
`;

const LearnMoreLink = styled.a`
  color: #1a73e8;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const FooterLink = styled.a`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #5f6368;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #202124;
  }
`;

const FooterDropdowns = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #dadce0;
  border-radius: 0.25rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #202124;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #1a73e8;
  }
`;

export default TravelContent;
