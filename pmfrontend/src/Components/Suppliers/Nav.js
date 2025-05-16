import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li style={styles.li}>
          <Link to="/add-supplier" style={styles.link}>Add Supplier</Link>
        </li>
        <li style={styles.li}>
          <Link to="/supplier-details" style={styles.link}>Supplier Details</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#FFA500",
    padding: "15px",
    textAlign: "center",
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  li: {
    display: "inline",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
};

export default Nav;