import { Routes, Route } from "react-router-dom";
import routes from "./utilities/routes";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import RequireAuth from "./hooks/RequireAuth";
import React from "react";
import "./assets/css/styles.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          {routes.map((route, routeKey) => (
            <React.Fragment key={routeKey}>
              {route.path === "/" ||
                route.path === "/register" ||
                route.path === "/login" ||
                route.path === "/about" ||
                route.path === "/wellness-insights" ||
                route.path === "/wellness-videos" ||
                route.path === "*" ? (
                  <Route path={route.path} element={<route.element />} />
              ) : (
                <Route element={<RequireAuth/>}>
                  <Route path={route.path} element={<route.element />} />
                </Route>
              )}
            </React.Fragment>
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;