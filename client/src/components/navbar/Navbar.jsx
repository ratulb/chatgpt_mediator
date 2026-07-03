import { Link, useLocation } from "react-router-dom";
import { menuItems } from "./menuitems/menuItems";
import MenuItem from "./menuitems/MenuItem";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">LLM Mediator</Link>
        <ul className="menus">
          {menuItems.map((item, index) => {
            return <MenuItem item={item} key={index} />;
          })}
        </ul>
      </nav>
      <hr className="navbardivider" />
    </div>
  );
};

function CustomLink({ to, className, children }) {
  //const resolvedPath = useResolvedPath(to);
  //const match = useMatch({ path: resolvedPath.pathname, end: true });
  const location = useLocation();
  const match = location.pathname === to;

  return (
    <li className={`${className} ${match ? "active" : ""}`}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default Navbar;
