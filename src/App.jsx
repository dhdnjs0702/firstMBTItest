import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import TestPage from "./pages/TestPage";
import TestResultsPage from "./pages/TestResultsPage";
import { useLoginStatus } from "./zustand/mbtiStore";
import TestResult from "./pages/TestResult";

const App = () => {
  const { isLogin, setIsLogin } = useLoginStatus((state) => state);
  useEffect(() => {
    setIsLogin(isLogin);
  }, [setIsLogin, isLogin]);

  const PublicRoute = () => {
    return <Outlet />;
  };

  const PrivateRoute = () => {
    return isLogin ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/testresults" element={<TestResultsPage />} />
          <Route path="/testresult" element={<TestResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
