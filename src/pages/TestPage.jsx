import { useState } from "react";
import CompNavBar from "../component/CompNavBar";
import { questions } from "../data/questions";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { saveResult } from "../api/auth";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();
  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
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
    try {
      await saveResult(mbtiResult);
      navigate(`/testresult?mbti=${mbtiResult}`);
    } catch (error) {
      console.log(error);
    }
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
      </div>
    </>
  );
};

export default TestPage;
