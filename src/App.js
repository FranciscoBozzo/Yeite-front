import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Songs from "./components/Song/Songs";
import NotFound from "./components/NotFound";
import SongEditor from "./components/Song/SongEditor";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="main-app container">
        <Routes>
          <Route path="/song/new" element={<SongEditor />} />
          <Route path="/song/:id" element={<SongEditor />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/song" element={<Songs />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" exact element={<Navigate to="/song" replace />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </main>
    );
  }
}

export default App;
