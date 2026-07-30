import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Files from "./pages/Files";
import Families from "./pages/Families";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        {/* Your Images */}
        <Route path="/gallery" element={<Gallery />} />

        {/* Your Files */}
        <Route path="/files" element={<Files />} />

        {/* Your Families */}
        <Route path="/families" element={<Families />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;