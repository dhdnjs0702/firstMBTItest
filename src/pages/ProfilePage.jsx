import CompNavBar from "../component/CompNavBar";
import { getUserInfo, updateProfile } from "../api/auth";
import { useNickName } from "../zustand/mbtiStore";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const ProfilePage = () => {
  const { nickName, setNickName } = useNickName();
  const queryClient = useQueryClient();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const { nickname } = await getUserInfo();
        setNickName(nickname);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패", error);
      }
    };

    getInfo();
  }, [setNickName]);

  const updateBtnMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      alert("닉네임이 성공적으로 변경되었습니다.");
    },
  });

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickName(value);
  };

  const btnHandler = (e) => {
    e.preventDefault();
    if (!nickName) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    updateBtnMutation.mutate({ nickName });
    localStorage.setItem("userNick", nickName);
  };

  return (
    <div>
      <CompNavBar />
      <div className="h-screen bg-gray-100 flex justify-center">
        <div className="py-6 px-8 mt-20 bg-white rounded shadow-xl h-[550px] w-[500px]">
          <h1>프로필 설정</h1>
          <form onSubmit={btnHandler}>
            <div>
              <label className="block text-gray-800 font-bold">
                닉네임 설정(최대 8자):
              </label>
              <input
                id="nickname"
                value={nickName}
                onChange={handleNicknameChange}
                maxLength={8}
                placeholder="닉네임을 입력해주세요"
                className="w-full border border-gray-300 py-3 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>

            <button
              disabled={updateBtnMutation.isPending}
              className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
            >
              {updateBtnMutation.isPending ? "변경 중..." : "닉네임 변경하기"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
