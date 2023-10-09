import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import SongEditor from "./components/Song/SongEditor";
import SongAdmin from "./components/Song/SongAdmin";
import NotFound from "./components/NotFound";
import Navbar from "./components/navbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div style={{height: "100vh"}} className="bg-darkest d-flex flex-column">
         <Navbar />
        <main className="container flex-grow-1 d-flex justify-content-center align-items-center">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/song" element={<SongAdmin />} />
            <Route path="/song/new" element={<SongEditor />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default App;
