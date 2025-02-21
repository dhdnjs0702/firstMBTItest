import React from "react";
import { useNavigate } from "react-router-dom";

const CompNavBar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <span>SPARTA MBTI</span>
      <span
        onClick={() => {
          navigate("/login");
        }}
      >
        로그인
      </span>
    </nav>
  );
};

export default CompNavBar;
