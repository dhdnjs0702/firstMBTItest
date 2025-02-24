import { useNavigate } from "react-router-dom";
import { useLoginStatus } from "../zustand/mbtiStore";

const CompNavBar = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useLoginStatus((state) => state);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userNick");
    setIsLogin(false);
    navigate("/");
  };

  const btnHandler = () => {
    if (isLogin) {
      handleLogout();
    } else {
      navigate("/signup");
    }
  };

  return (
    <nav>
      <span onClick={() => navigate("/")}>SPARTA MBTI</span>
      {isLogin && (
        <>
          <span onClick={() => navigate("/test")}>테스트하기</span>
          <span onClick={() => navigate("/testresults")}>결과 확인</span>
          <span onClick={() => navigate("/profile")}>마이페이지</span>
        </>
      )}
      <span onClick={btnHandler}>{isLogin ? "로그아웃" : "로그인"}</span>
    </nav>
  );
};

export default CompNavBar;
