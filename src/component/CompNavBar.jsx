import React from "react";
import { useNavigate } from "react-router-dom";
import { useLoginStatus } from "../zustand/mbtiStore";

const CompNavBar = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useLoginStatus((state) => state);
  const btnHandler = () => {
    if (isLogin) {
      setIsLogin(!isLogin);
      localStorage.setItem("accessToken", "");
    } else {
      navigate("/signup");
    }
  };
  return (
    <nav>
      <span onClick={() => navigate("/")}>SPARTA MBTI</span>
      <span onClick={btnHandler}>{isLogin ? "로그아웃" : "로그인"}</span>
    </nav>
  );
};

export default React.memo(CompNavBar);
