import { useEffect, useState } from "react";
import CompNavBar from "../component/CompNavBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(!!token); 
    console.log("Token in useEffect:", token);
  }, []); 

  useEffect(() => {
    if (isLogin) {
      console.log("User is logged in, navigating to /test");
      navigate("/test"); 
    }
  }, [isLogin, navigate]); 

  const jumpToPage = () => {
    const token = localStorage.getItem("accessToken");
    console.log("Token in jumpToPage:", token);
    if (token) {
      navigate("/test");
    } else {
      navigate("/signup");
    }
  };

  return (
    <>
      <CompNavBar />
      <div>
        <h1>무료 성격 테스트</h1>
        <h3>간단한 설명</h3>
        <span>성격 유형 검사</span>
        <span>성격 유형 이해</span>
        <span>팀 평가</span>
      </div>
      <button onClick={jumpToPage}>내 성격 알아보기</button>
    </>
  );
};

export default HomePage;
