import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CompNavBar from "../component/CompNavBar";
import { mbtiDescriptions } from "../utils/mbtiCalculator";

const TestResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mbtiResult = searchParams.get("mbti");

  useEffect(() => {
    if (!mbtiResult) {
      navigate("/test");
    }
  }, [mbtiResult, navigate]);

  if (!mbtiResult) {
    return null;
  }

  const handleRetakeTest = () => {
    navigate("/test");
  };

  const handleViewAllResults = () => {
    navigate("/testresults");
  };

  return (
    <>
      <CompNavBar />
      <div>
        <h1>테스트 결과</h1>
        <div>
          <h2>당신의 MBTI는 {mbtiResult}입니다!</h2>
          <p>{mbtiDescriptions[mbtiResult]}</p>
        </div>
        
        <div>
          <button onClick={handleRetakeTest}>
            테스트 다시하기
          </button>
          <button onClick={handleViewAllResults}>
            전체 결과 보기
          </button>
        </div>
      </div>
    </>
  );
};

export default TestResult;