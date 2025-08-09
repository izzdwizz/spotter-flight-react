import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavTravel } from "../../assets/Icons/NavTravel";
import NavExplore from "../../assets/Icons/NavExplore";
import { NavFlight } from "../../assets/Icons/NavFlight";
import { NavHotel } from "../../assets/Icons/NavHotel";
import { NavVacation } from "../../assets/Icons/NavVacation";
import Moon from "../../assets/Icons/Moon";
import { Sun } from "../../assets/Icons/Sun";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <NavContainer>
        <LeftSection>
          <MenuButton onClick={toggleMobileMenu}>
            <MdOutlineMenu className="w-[1.35rem] h-[1.35rem] relative bottom-[2px]" />
          </MenuButton>

          <Logo onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <GoogleLogo src="/src/assets/google_logo.svg" alt="Google" />
          </Logo>
          <CenterSection>
            <NavItem>
              <NavIcon>
                <NavTravel />
              </NavIcon>
              Travel
            </NavItem>

            <NavItem>
              <NavIcon>
                <NavExplore />
              </NavIcon>
              Explore
            </NavItem>

            <NavItem className="active">
              <NavIcon>
                <NavFlight />
              </NavIcon>
              Flights
            </NavItem>

            <NavItem>
              <NavIcon>
                <NavHotel />
              </NavIcon>
              Hotels
            </NavItem>

            <NavItem>
              <NavIcon>
                <NavVacation />
              </NavIcon>
              Vacation rentals
            </NavItem>
          </CenterSection>
        </LeftSection>

        <RightSection>
          <IconButton onClick={toggleDarkMode}>
            {!isDarkMode ? <Sun /> : <Moon />}
          </IconButton>

          <IconButton>
            <MenuIcon viewBox="0 0 24 24" fill="currentColor">
              <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
            </MenuIcon>
          </IconButton>

          <ProfileButton>T</ProfileButton>
        </RightSection>
      </NavContainer>

      {/* Sidebar Backdrop */}
      {isMobileMenuOpen && <SidebarBackdrop onClick={toggleMobileMenu} />}

      {/* Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen}>
        <SidebarContent>
          {/* Primary Navigation */}
          <SidebarSection>
            <SidebarItem>
              <NavIcon>
                <NavTravel color="#5f6367" />
              </NavIcon>
              Travel
            </SidebarItem>

            <SidebarItem>
              <NavIcon>
                <NavExplore color="#5f6367" />
              </NavIcon>
              Explore
            </SidebarItem>

            <SidebarItem className="active">
              <NavIcon>
                <NavFlight color="#5f6367" />
              </NavIcon>
              Flights
            </SidebarItem>

            <SidebarItem>
              <NavIcon>
                <NavHotel color="#5f6367" />
              </NavIcon>
              Hotels
            </SidebarItem>

            <SidebarItem>
              <NavIcon>
                <NavVacation color="#5f6367" />
              </NavIcon>
              Vacation rentals
            </SidebarItem>
          </SidebarSection>

          <SidebarDivider />

          <SidebarSection>
            <SidebarItem>
              <NavIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 13v-1m4 1v-3m4 3V8M12 21l9-9-9-9-9 9 9 9z"
                  />
                </svg>
              </NavIcon>
              Tracked flight prices
            </SidebarItem>

            <SidebarItem>
              <NavIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </NavIcon>
              Price guarantee
            </SidebarItem>

            <SidebarItem>
              <NavIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </NavIcon>
              Change language
            </SidebarItem>

            <SidebarItem>
              <NavIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </NavIcon>
              Change currency
            </SidebarItem>

            <SidebarItem>
              <NavIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </NavIcon>
              Change location
            </SidebarItem>
          </SidebarSection>

          <SidebarDivider />

          {/* Settings and Help */}
          <SidebarSection>
            <SidebarItem>
              <NavIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </NavIcon>
              Flights settings
            </SidebarItem>

            <SidebarItem>
              <NavIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </NavIcon>
              Feedback
            </SidebarItem>

            <SidebarItem>
              <NavIcon>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </NavIcon>
              Help
            </SidebarItem>
          </SidebarSection>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default Navbar;
const NavContainer = styled.nav`
  position: sticky !important;
  top: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: white;
  border-bottom: 1px solid #dddfe2;

  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const MenuIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  color: #4b5563;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GoogleLogo = styled.img`
  height: 1.55rem;
  width: auto;
`;

const CenterSection = styled.div`
  display: none;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.875rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #202124;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #dddfe2;

  &:hover {
    background-color: #dbeafe;
  }

  &.active {
    background-color: #dbeafe;
    color: #1d4ed8;
    border: none;
  }
`;

const NavIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: #8b5cf6;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-left: 0.25rem;
`;

const Sidebar = styled.div`
  position: absolute;
  top: bottom;
  left: ${(props) => (props.isOpen ? "0" : "-100%")};
  width: 300px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid #dddfe2;
  padding: 1rem 0;
  z-index: 1000;
  transition: left 0.3s ease-in-out;
  overflow-y: auto;
  box-shadow: ${(props) =>
    props.isOpen ? "2px 0 8px rgba(0, 0, 0, 0.1)" : "none"};
`;

const SidebarBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.02);
  z-index: 999;
`;

const SidebarContent = styled.div`
  cursor: pointer;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  width: min(256px, 100vw);
  overflow-y: auto;
`;

const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const SidebarDivider = styled.div`
  height: 1px;
  background-color: #dddfe2;
  width: 100%;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0 50px 50px 0;
  cursor: pointer;
  transition: all 0.4s ease;
  color: #202124;
  font-size: 0.875rem;
  font-weight: 500;

  font-family: "Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif;

  &:hover {
    background-color: #f3f4f6;
  }

  &.active {
    background-color: #dbeafe;
    color: #1d4ed8;

    svg {
      color: #1d4ed8 !important;
    }
  }

  svg {
    color: #5f6368;
    width: 1.25rem;
    height: 1.25rem;
  }
`;
