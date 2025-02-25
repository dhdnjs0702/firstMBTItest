import { mbtiDescriptions } from "../utils/mbtiCalculator";

const CompMbtiResultCard = ({
  result,
  deleteMutation,
  handleDelete,
  handleVisibility,
}) => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {result.usernick}님: {result.mbti}
        </h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">
          {mbtiDescriptions[result.mbti]}
        </p>
        <p>테스트 날짜: {new Date(result.timestamp).toLocaleDateString()}</p>
        <button
          className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => handleDelete(result.id)}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "삭제 중..." : "삭제"}
        </button>
        <button
          className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => {
            handleVisibility(result);
          }}
        >
          {result.visibility ? "공개" : "비공개"}
        </button>
      </div>
    </div>
  );
};

export default CompMbtiResultCard;
