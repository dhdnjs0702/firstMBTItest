import CompNavBar from "../component/CompNavBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const movePageHandler = () => {
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
      <button onClick={movePageHandler}>내 성격 알아보기</button>
    </>
  );
};

export default HomePage;
