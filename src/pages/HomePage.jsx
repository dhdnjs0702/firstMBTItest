import CompDescribeCard from "../component/CompDescribeCard";
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
        <CompDescribeCard
          main={"빠른 무료 검사"}
          desc={"20문 문항으로 테스트하여 더욱 빠른 검사 가능"}
        />
        <CompDescribeCard
          main={"간단한 설명"}
          desc={"홈페이지 관련 간단한 설명이 들어갑니다"}
        />
        <CompDescribeCard
          main={"성격 유형 검사"}
          desc={"다른 사이트에서 보지 못한 신박한 문항들로 재밌게 검사해보세요"}
        />
        <CompDescribeCard
          main={"팀 평가"}
          desc={"다른 유저들의 성격 유형은 어떤지 확인해 보세요"}
        />
      </div>
      <button
        className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
        onClick={movePageHandler}
      >
        내 성격 알아보기
      </button>
    </>
  );
};

export default HomePage;
