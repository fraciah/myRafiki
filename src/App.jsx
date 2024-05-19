import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import routes from "./utilities/routes";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import "./assets/css/styles.css";

function App() {

  return (
    <Router>
      <AuthProvider>
        <Navbar/>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
        </Routes>
        <Footer/>
      </AuthProvider>
    </Router>
  )
}

export default App
