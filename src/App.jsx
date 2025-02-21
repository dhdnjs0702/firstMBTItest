import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePge from "./pages/ProfilePge";
import TestPage from "./pages/TestPage";
import TestResultsPage from "./pages/TestResultsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePge />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/testresults" element={<TestResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
