const CompMbtiResultCard = () => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Card title
        </h3>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">
          Some quick example text to build on the card title and make up the
          bulk of the card content.
        </p>
        <button
          className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          href="#"
        >
          Go somewhere
        </button>
      </div>
    </div>
  );
};

export default CompMbtiResultCard;
