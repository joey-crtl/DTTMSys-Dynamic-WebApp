import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import International from "./pages/international";
import Domestic from "./pages/domestic";
import Search from "./pages/search";
import Details from "./pages/details";
import Blogs from "./pages/blogs";
import Navbar from "./components/navbar"; 
import "./styles/main.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div id="home"><Home /></div>
              <div id="about"><About /></div>
              <div id="contact"><Contact /></div>
            </>
          }
        />
        <Route path="/international" element={<International />} />
        <Route path="/domestic" element={<Domestic />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details" element={<Details />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </Router>
  );
}

export default App;
