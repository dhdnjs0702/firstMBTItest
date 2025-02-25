const CompDescribeCard = ({ main, desc }) => {
  return (
    <div className="size-full bg-white shadow-lg rounded-lg p-5 dark:bg-neutral-900">
      <div className="flex items-center gap-x-4 mb-3">
        <div className="inline-flex justify-center items-center size-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
          <svg
            className="shrink-0 size-6 text-blue-600 dark:text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="13.5" cy="6.5" r=".5" />
            <circle cx="17.5" cy="10.5" r=".5" />
            <circle cx="8.5" cy="7.5" r=".5" />
            <circle cx="6.5" cy="12.5" r=".5" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
          </svg>
        </div>
        <div className="shrink-0">
          <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
            {main}
          </h3>
        </div>
      </div>
      <p className="text-gray-600 dark:text-neutral-400">{desc}</p>
    </div>
  );
};

export default CompDescribeCard;
