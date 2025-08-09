import React from "react";
import styled from "styled-components";

const Hero = () => {
  return (
    <HeroContainer>
      <ContentWrapper>
        <LandingPageImage src="/src/assets/hero_img.svg" alt="Google" />
        <Title>Flights</Title>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled.div`
  position: relative;
  min-height: 40vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;

  @media (max-width: 1200px) {
    min-height: 25vh;
  }

  @media (max-width: 768px) {
    min-height: 15vh;
  }
  @media (max-width: 480px) {
    min-height: 10vh;
  }
`;

const ContentWrapper = styled.div`
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const Title = styled.h1`
  font-family: "Google Sans Display", Roboto, "Helvetica Neue", Arial,
    sans-serif;
  position: relative;
  bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: #1a1a1a;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 480px) {
    font-size: 1.75rem;
    bottom: 2.5rem;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
    bottom: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 3.5rem;
    bottom: 4rem;
  }
`;

const LandingPageImage = styled.img`
  width: 95vw;
  height: auto;
  max-height: 15vh;
  object-fit: contain;

  @media (min-width: 480px) {
    width: 90vw;
    max-height: 18vh;
  }

  @media (min-width: 768px) {
    width: 85vw;
    max-height: 22vh;
  }

  @media (min-width: 1024px) {
    width: 80vw;
    max-height: 25vh;
  }

  @media (min-width: 1200px) {
    width: 75vw;
    max-height: 30vh;
  }
`;
