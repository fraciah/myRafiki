import { Routes, Route } from "react-router-dom";
import routes from "./utilities/routes";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import RequireAuth from "./hooks/RequireAuth";
import React, { useState } from "react";
import "./assets/css/styles.css";
import Loading from "./components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app-container">
      <Navbar />
      <Loading isLoading={isLoading} />
      <div className="main-content">
        <Routes>
          {routes.map((route, routeKey) => (
            <React.Fragment key={routeKey}>
              {route.path === "/" ||
                route.path === "/register" ||
                route.path === "/login" ||
                route.path === "/reset-password" ||
                route.path === "/about" ||
                route.path === "/wellness-insights" ||
                route.path === "/wellness-videos" ||
                route.path === "*" ? (
                  <Route path={route.path} element={<route.element setIsLoading={setIsLoading}/>} />
              ) : (
                <Route element={<RequireAuth/>}>
                  <Route 
                    path={route.path} 
                    element={<route.element setIsLoading={setIsLoading}/>} 
                  />
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