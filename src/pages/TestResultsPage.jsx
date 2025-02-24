import { useEffect } from "react";
import { deleteTestResult, getTestResults } from "../api/auth";
import CompNavBar from "../component/CompNavBar";
import { useResults } from "../zustand/mbtiStore";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TestResultsPage = () => {
  const queryClient = useQueryClient();
  const { results, setResults } = useResults((state) => state);
  const currentUserId = localStorage.getItem("userInfo");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getTestResults();
        setResults(data);
      } catch (error) {
        console.error("결과 정보 가져오기 실패", error);
      }
    };

    getData();
  }, [setResults]);

  const deleteMutation = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testResults"] });
      const updatedResults = results.filter(
        (e) => e.id !== deleteMutation.variables //variables ==> 들어가는 매개변수를 의미한다고 이해했습니다.
      );
      setResults(updatedResults);
    },
  });

  const handleDelete = (resultId) => {
    if (window.confirm("정말로 이 결과를 삭제하시겠습니까?")) {
      deleteMutation.mutate(resultId);
    }
  };

  return (
    <div>
      <CompNavBar />
      <h1>테스트 결과</h1>
      <div>
        {results.map((result) => (
          <div key={result.id}>
            <div>
              <h3>MBTI 결과: {result.mbti}</h3>
              <p>{mbtiDescriptions[result.mbti]}</p>
              <p>
                테스트 날짜: {new Date(result.timestamp).toLocaleDateString()}
              </p>
              {currentUserId === result.userId && (
                <button
                  onClick={() => handleDelete(result.id)}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "삭제 중..." : "삭제"}
                </button>
              )}
            </div>
            <hr />
          </div>
        ))}

        {results.length === 0 && <p>저장된 테스트 결과가 없습니다.</p>}
      </div>
    </div>
  );
};

export default TestResultsPage;
