import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { About } from "./pages/aboutUs/About";
import { EmailIndex } from "./pages/email/EmailIndex";

export const App = () => {
  return (
    <Router>
      <div>Header</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/email" element={<EmailIndex />} />
      </Routes>
      <div>Footer</div>
    </Router>
  );
};
