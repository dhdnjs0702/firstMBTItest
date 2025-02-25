import {
  changeVisibility,
  deleteTestResult,
  getTestResults,
} from "../api/auth";
import CompNavBar from "../component/CompNavBar";
import { useResults } from "../zustand/mbtiStore";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CompMbtiResultCard from "../component/CompMbtiResultCard";

const TestResultsPage = () => {
  const queryClient = useQueryClient();
  const { results, setResults } = useResults((state) => state);

  const {
    data: testResults,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["testResults"],
    queryFn: getTestResults,
  });

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
    // onMutate: async (selectedInfo) => {
    //   const previousTestResults = queryClient.getQueryData(["testResults"]);

    //   queryClient.setQueryData(["testResults"], (prev) =>
    //     prev.map((result) =>
    //       result.id === selectedInfo.id
    //         ? { ...result, visibility: !result.visibility }
    //         : result
    //     )
    //   );

    //   return { previousTestResults };
    // },
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
      <div>
        <CompNavBar />
        <h1>테스트 결과</h1>
        {testResults
          .filter((e) => {
            return (
              e.visibility === false ||
              e.userId === localStorage.getItem("userInfo")
            );
          })
          .map((result) => {
            return (
              <CompMbtiResultCard
                result={result}
                handleDelete={handleDelete}
                deleteMutation={deleteMutation}
                handleVisibility={handleVisibility}
              />
            );
          })}
        {testResults.length === 0 && <p>저장된 테스트 결과가 없습니다.</p>}
      </div>
    </div>
  );
};

export default TestResultsPage;
