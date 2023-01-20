import Dropdown from "./Dropdown";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Tooltip from "../../common/Tooltip";

const MenuItem = ({ item }) => {
  const location = useLocation();
  const match = location.pathname === item.to;
  const [dropdown, setDropdown] = useState(false);
  //const [deActive, setDeActive] = useState(item.to === "/actions" || item.to === "/preferences");
  const [deActive, setDeActive] = useState(item.to === "/actions");

  const ddReference = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (
        dropdown &&
        ddReference.current &&
        !ddReference.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  /***  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };
  {/***onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}***/
  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };
  return (
    <li
      onClick={closeDropdown}
      ref={ddReference}
      className={`menu-item ${match ? "active" : ""}`}
    >
      {item.submenu ? (
        <>
          <Link
            role="button"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            aria-haspopup="menu"
            to={item.to}
          >
            {item.title}
          </Link>
          <Dropdown dropdown={dropdown} submenu={item.submenu} />
        </>
      ) : (<>{deActive ?
        <Tooltip content="Preview deactivated" direction="bottom">
          <Link to={item.to} style={{ pointerEvents: 'none' }}>{item.title}</Link> </Tooltip> :
        <Link to={item.to}>{item.title}</Link>
      }</>)}
    </li>
  );
};

export default MenuItem;
