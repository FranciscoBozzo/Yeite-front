import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="text-2xl py-5 text-white">
      <nav id="breadcrumbs" class="px-6">
        <ul class="flex gap-4">
          <li>
            <Link to="/home">Yeite</Link>
          </li>
          <li>
            /
          </li>
          <li>
            <Link to="/song">User</Link>
          </li>
          <li>
            /
          </li>
          <li class="active">
            <Link to="/song/new">Nueva canción</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
