import React from "react";
import CompNavBar from "../component/CompNavBar";

const HomePage = () => {
  return (
    <>
      <CompNavBar />
      <div>
        <h1>무료 성격 테스트</h1>
        <h3>간단한 설명</h3>
        <sapn>성격 유형 검사</sapn>
        <span>성격 유형 이해</span>
        <span>팀 평가</span>
      </div>
    </>
  );
};

export default HomePage;
