import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { GiPriceTag } from "react-icons/gi";
import { IoGameControllerOutline, IoStorefront } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";

export const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [input, setInput] = useState("");
  let history = useHistory();

  const showSidebar = () => setSidebar(!sidebar);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
    // 👇️ redirect to /contacts
    history.push(`/search/${input}`);
  };

  return (
    <nav>
      <Link to="/">
        <div className="logo">
          <IoGameControllerOutline className="navbar-logo" />
        </div>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="input"
          placeholder="Search for a deal..."
          onInput={(e) => setInput(e.target.value)}
        />
        <Link to={`/search/${input}`}>
          <BsSearch className="search-icon" />
        </Link>
      </form>
      <div className="navbar-links">
        <ul>
          <Link to="/deals">
            <li>Deals</li>
          </Link>
          <Link to="/games">
            <li>Games</li>
          </Link>
          <Link to="/stores">
            <li>Stores</li>
          </Link>
        </ul>
      </div>
      <div className="navbar-menu" onClick={showSidebar}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-sidebar-links" onClick={showSidebar}>
          <li className="close-icon">
            <AiOutlineClose />
          </li>
          <Link to="/deals">
            <li className="sidebar-link">
              <GiPriceTag />
              <span>Deals</span>
            </li>
          </Link>
          <Link to="/games">
            <li className="sidebar-link">
              <CgGames />
              <span>Games</span>
            </li>
          </Link>
          <Link to="/stores">
            <li className="sidebar-link">
              <IoStorefront />
              <span>Stores</span>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};
