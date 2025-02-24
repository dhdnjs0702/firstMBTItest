import { useState } from "react";
import CompNavBar from "../component/CompNavBar";
import { questions } from "../data/questions";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { saveResult } from "../api/auth";

const TestPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState(null);

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    const answers = Object.keys(selectedOptions)
      .map((questionId) => {
        const question = questions.find((q) => q.id === Number(questionId));
        if (!question) return null;

        const userAnswer = selectedOptions[questionId];

        const [type1, type2] = question.type.split("/");
        const selectedType = question.options[0] === userAnswer ? type1 : type2;

        return {
          type: question.type,
          answer: selectedType,
        };
      })
      .filter(Boolean);

    const mbtiResult = calculateMBTI(answers);
    setResult(mbtiResult);
    saveResult(mbtiResult);

    console.log("사용자 답변:", answers);
    console.log("MBTI 결과:", mbtiResult);
  };

  return (
    <>
      <CompNavBar />
      <div>
        <h1>TestPage</h1>

        {questions.map((e) => {
          return (
            <div key={e.id}>
              <div>
                질문 {e.id}: {e.question}
              </div>
              <div>
                {e.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(e.id, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <p>선택된 옵션: {selectedOptions[e.id]}</p>
            </div>
          );
        })}

        <button onClick={handleSubmit}>결과 제출하기</button>

        {result && (
          <>
            <p>테스트 결과</p>
            <p> {mbtiDescriptions[result]}</p>
          </>
        )}
      </div>
    </>
  );
};

export default TestPage;
