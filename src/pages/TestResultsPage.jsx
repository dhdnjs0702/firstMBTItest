import {
  changeVisibility,
  deleteTestResult,
  getTestResults,
} from "../api/auth";
import CompNavBar from "../component/CompNavBar";
import { useResults } from "../zustand/mbtiStore";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const TestResultsPage = () => {
  const queryClient = useQueryClient();
  const { results, setResults } = useResults((state) => state);
  const currentUserId = localStorage.getItem("userInfo");

  const {
    data: testResults,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["testResults"],
    queryFn: getTestResults,
  });

  console.log(testResults);

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

  //주석 바로 밑 부분을 참조하시면 됩니다.
  const visibilityMutation = useMutation({
    mutationFn: changeVisibility,
    onMutate: async (selectedInfo) => {
      const previousTestResults = queryClient.getQueryData(["testResults"]);

      queryClient.setQueryData(["testResults"], (prev) =>
        prev.map((result) =>
          result.id === selectedInfo.id
            ? { ...result, visibility: !result.visibility }
            : result
        )
      );

      // 롤백을 위해 이전 데이터 반환
      return { previousTestResults };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testResults"] });
    },
  });
  const handleVisibility = (selectedInfo) => {
    visibilityMutation.mutate(selectedInfo);
  };

  if (isPending) {
    return <div>로딩중,,,</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다. 관리자에게 문의 해주세요</div>;
  }
  return (
    <div>
      <CompNavBar />
      <h1>테스트 결과</h1>
      <div>
        {testResults
          .filter((e) => {
            return (
              e.visibility === false ||
              e.userId === localStorage.getItem("userInfo")
            );
          })
          .map((result) => (
            <div key={result.id}>
              <div>
                <h3>
                  {result.usernick}님의MBTI 결과: {result.mbti}
                </h3>
                <p>{mbtiDescriptions[result.mbti]}</p>
                <p>
                  테스트 날짜: {new Date(result.timestamp).toLocaleDateString()}
                </p>
                {currentUserId === result.userId && (
                  <>
                    <button
                      onClick={() => handleDelete(result.id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? "삭제 중..." : "삭제"}
                    </button>{" "}
                    <span></span>
                    <button
                      onClick={() => {
                        handleVisibility(result);
                      }}
                    >
                      {result.visibility ? "공개" : "비공개"}
                    </button>
                  </>
                )}
              </div>
              <hr />
            </div>
          ))}

        {testResults.length === 0 && <p>저장된 테스트 결과가 없습니다.</p>}
      </div>
    </div>
  );
};

export default TestResultsPage;
