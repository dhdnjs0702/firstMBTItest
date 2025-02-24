import axios from "axios";

const Api = axios.create({
  baseURL: "https://www.nbcamp-react-auth.link",
});

const jsonApi = axios.create({
  baseURL: "https://scrawny-beaded-bookcase.glitch.me",
});

export const updateTestResultVisibility = async (userId, visibility) => {
  const response = await jsonApi.patch(`testResults/${userId}`, { visibility });
  return response.data;
};

export const saveResult = async (mbtiResult) => {
  try {
    const response = await jsonApi.post("/testResults", {
      mbti: mbtiResult,
      timestamp: new Date().toISOString(),
      userId: localStorage.getItem("userInfo"),
      visibility: true,
    });
    console.log("결과가 저장되었습니다:", response.data);
  } catch (error) {
    console.error("결과 저장 중 오류 발생:", error);
  }
};

export const getTestResults = async () => {
  try {
    const response = await jsonApi.get("/testResults");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("테스트 결과 가져오기 실패", error);
  }
};

export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("로그인을 먼저 진행해주세요");
    }
    const response = await Api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("결과 불러오는 중 오류 발생", error);
  }
};

export const updateProfile = async ({ nickName }) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("로그인을 먼저 진행해주세요");
    }

    const response = await Api.patch(
      `/profile`,
      { nickname: nickName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTestResult = async (userId) => {
  const response = await jsonApi.delete(`/testResults/${userId}`);
  return response.data;
};
export default { Api, jsonApi };
