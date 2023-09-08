import { NavLink } from "react-router-dom";
import "./navbar.scss";

export const Navbar = () => {
  return (
    <nav className="navbar-container">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/email">Email</NavLink>
    </nav>
  );
};
