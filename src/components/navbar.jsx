import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="container-fluid pt-2">
      <nav className="breadcrumb">
        <ol className="breadcrumb text-white fs-4" style={{"--bs-breadcrumb-divider-color" : "white", "--bs-breadcrumb-item-padding-x":"1.25rem"}}>
          <li className="breadcrumb-item">
            <Link to="/home">Yeite</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/song">User</Link>
          </li>
          <li className="breadcrumb-item">
          <Link to="/song/new">Nueva canción</Link>
          </li>
        </ol>
      </nav>
    </section>
  );
};

export default Navbar;
