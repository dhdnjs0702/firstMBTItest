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
    alert("로그아웃 되었습니다.");
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
    <nav className="flex justify-between px-8 py-8">
      <span onClick={() => navigate("/")}>SPARTA MBTI</span>
      {isLogin && (
        <div className="hidden md:flex justify-around space-x-20">
          <span
            className="hover:text-indigo-600 text-gray-700"
            onClick={() => navigate("/test")}
          >
            테스트하기
          </span>
          <span
            className="hover:text-indigo-600 text-gray-700"
            onClick={() => navigate("/testresults")}
          >
            결과 확인
          </span>
          <span
            className="hover:text-indigo-600 text-gray-700"
            onClick={() => navigate("/profile")}
          >
            마이페이지
          </span>
        </div>
      )}
      <span
        className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm"
        onClick={btnHandler}
      >
        {isLogin ? "로그아웃" : "로그인"}
      </span>
    </nav>
  );
};

export default CompNavBar;
