import { flexBase } from "components/commonStyles";

import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

const Nav = styled.nav`
  ${flexBase}
  justify-content: flex-end;
  align-items: center;
  background-color: papayawhip;
  height: 3rem;

  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.27);

  margin-bottom: 2rem;
`;

const StyledLink = styled(NavLink)`
  margin: 0.5rem;
  text-decoration: none;
  border-radius: 3px;
  padding: 0.25rem;
  color: black;

  &.active {
    background-color: #f5ce91;
  }

  transition: background-color 100ms ease-in-out;
`;

export const Navbar = () => {
  return (
    <Nav>
      <StyledLink exact to="/">
        Shop
      </StyledLink>
      <StyledLink to="/checkout">Checkout</StyledLink>
    </Nav>
  );
};
