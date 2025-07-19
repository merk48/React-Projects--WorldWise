import { NavLink } from "react-router-dom";
import styles from "./styles/PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product" className="text">
            {" "}
            Product
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
