import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import routes from "./utilities/routes";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import "./assets/css/styles.css";

function App() {
  return (
    <div className="app-container">
      <Router>
        <AuthProvider>
          <Navbar />
          <div className="main-content">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.element />} />
              ))}
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;