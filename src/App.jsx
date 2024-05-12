import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import { AuthProvider } from './contexts/AuthContext';
import routes from "./utilities/routes";
import "./assets/css/styles.css";

function App() {

  return (
    <Router>
      {/* <AuthProvider> */}
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.page />} />
        ))}
      </Routes>
      {/* </AuthProvider> */}
    </Router>
  )
}

export default App
