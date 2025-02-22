import { useEffect } from "react";
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
const App = () => {
  const { isLogin, setIsLogin } = useLoginStatus((state) => state);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(!!token);
  }, [setIsLogin]);

  const PublicRoute = () => {
    return <>{!isLogin ? <Outlet /> : <Navigate to="/test" replace />}</>;
  };

  const PrivateRoute = () => {
    return <>{isLogin ? <Outlet /> : <Navigate to="/signup" replace />}</>;
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
