import React, { useState } from "react";
import styled from "styled-components";

const FlightExploration = () => {
  const [selectedOrigin, setSelectedOrigin] = useState("Enugu");

  const originOptions = ["Enugu", "Asaba", "Owerri", "Port Harcourt"];

  return (
    <ExplorationContainer>
      {/* Top Section: Flight Search and Exploration */}
      <TopSection>
        <HeaderSection>
          <Title>
            Find cheap flights from {selectedOrigin} to anywhere
            <InfoIcon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </InfoIcon>
          </Title>

          <OriginSuggestions>
            {originOptions.map((origin) => (
              <OriginButton
                key={origin}
                isSelected={selectedOrigin === origin}
                onClick={() => setSelectedOrigin(origin)}
              >
                {origin}
              </OriginButton>
            ))}
          </OriginSuggestions>
        </HeaderSection>

        <MapSection>
          <WorldMap>
            <MapBackground />
            <ExploreButton onClick={() => alert("Explore destinations")}>
              Explore destinations
            </ExploreButton>
          </WorldMap>
        </MapSection>
      </TopSection>

      <BottomSection>
        <SectionTitle>
          Useful tools to help you find the best deals
        </SectionTitle>

        <ToolsGrid>
          <LeftColumn>
            <FeatureCard>
              <CardIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </CardIcon>
              <CardTitle>Find the cheapest days to fly</CardTitle>
              <CardText>
                The Date grid and Price graph make it easy to see the best
                flight deals
              </CardText>
              <Pointer />
            </FeatureCard>

            <FeatureCard>
              <CardIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </CardIcon>
              <CardTitle>See the whole picture with price insights</CardTitle>
              <CardText>
                Price history and trend data show you when to book to get the
                best price on your flight
              </CardText>
            </FeatureCard>

            <FeatureCard>
              <CardIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 004 6v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-1.81 1.19z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3"
                  />
                </svg>
              </CardIcon>
              <CardTitle>Track prices for a trip</CardTitle>
              <CardText>
                Not ready to book yet? Observe price changes for a route or
                flight and get notified when prices drop.
              </CardText>
            </FeatureCard>
          </LeftColumn>

          <RightColumn>
            <InsightTitle>
              Insightful tools help you choose your trip dates
            </InsightTitle>
            <InsightText>
              Play around with the <strong>Date grid</strong> and{" "}
              <strong>Price graph</strong> options on the Search page to find
              the cheapest days to get to your destination – and back again for
              round trips.
            </InsightText>

            <CalendarIllustration>
              <CalendarHeader>
                <CalendarIcon>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </CalendarIcon>
                <HeaderText>
                  <div></div>
                  <div></div>
                </HeaderText>
              </CalendarHeader>

              <CalendarGrid>
                {Array.from({ length: 35 }, (_, i) => {
                  if (i === 2 || i === 5) {
                    return (
                      <GridCell key={i} className="unavailable">
                        ✕
                      </GridCell>
                    );
                  } else if (i === 3 || i === 15 || i === 28) {
                    return (
                      <GridCell key={i} className="good-price">
                        ★
                      </GridCell>
                    );
                  } else {
                    return <GridCell key={i}></GridCell>;
                  }
                })}
              </CalendarGrid>
            </CalendarIllustration>
          </RightColumn>
        </ToolsGrid>
      </BottomSection>
    </ExplorationContainer>
  );
};

// Styled Components
const ExplorationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const TopSection = styled.div`
  margin-bottom: 4rem;
`;

const HeaderSection = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: "Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  color: #5f6368;
  cursor: pointer;
`;

const OriginSuggestions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const OriginButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  background-color: ${(props) =>
    props.isSelected ? "#dbeafe" : "transparent"};
  color: ${(props) => (props.isSelected ? "#1d4ed8" : "#5f6368")};
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #dddfe2;
  &:hover {
    background-color: transparent;
    border-color: ${(props) => (props.isSelected ? "#1557b0" : "#dadce0")};
  }
`;

const MapSection = styled.div`
  position: relative;
`;

const WorldMap = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #e8f4fd 0%, #d4edfd 100%);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
`;

const MapBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/src/assets/defaultMap.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  cursor: pointer;
  transition: filter 0.4s ease-in-out;

  &:hover {
    filter: brightness(0.8);
    & > img {
      scale: 1.2;
    }
  }
`;

const ExploreButton = styled.button`
  position: relative;
  z-index: 2;
  padding: 0.875rem 2rem;
  color: #1a73e8;

  background-color: white;
  border: none;
  border-radius: 1.5rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.4s ease-in-out;
`;

const BottomSection = styled.div`
  margin-top: 4rem;
`;

const SectionTitle = styled.h2`
  font-family: "Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin-bottom: 2rem;
  text-align: left;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FeatureCard = styled.div`
  padding: 1.5rem;
  border: 1px solid #dadce0;
  border-radius: 0.75rem;
  background-color: #f3f7ff;
  transition: box-shadow 0.2s;
  position: relative;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;
const Pointer = styled.div`
  transform: rotate(-135deg);
  background-color: #f3f7ff;
  border: 1px solid #dadce0;
  clip-path: polygon(0 0, 100% 100%, 0 100%);
  height: 26px;
  position: absolute;
  top: 45%;
  right: -14px;
  width: 26px;
`;
const CardIcon = styled.div`
  width: 2rem;
  height: 2rem;
  color: #1a73e8;
  margin-bottom: 1rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const CardTitle = styled.h3`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  color: #202124;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #5f6368;
  line-height: 1.5;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InsightTitle = styled.h3`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: #202124;
  margin-bottom: 1rem;
`;

const InsightText = styled.p`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 0.875rem;
  color: #5f6368;
  line-height: 1.6;
  margin-bottom: 1.5rem;

  strong {
    color: #202124;
    font-weight: 500;
  }
`;

const CalendarIllustration = styled.div`
  background-color: white;
  border: 1px solid #dadce0;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #e8f4fd;
  border-bottom: 1px solid #dadce0;
`;

const CalendarIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  color: #1a73e8;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  div {
    height: 0.75rem;
    background-color: #5f6368;
    border-radius: 0.125rem;
    width: 100px;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  padding: 1rem;
  background-color: #f8f9fa;
`;

const GridCell = styled.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;

  &.unavailable {
    color: #d93025;
  }

  &.good-price {
    color: #137333;
  }
`;

export default FlightExploration;
