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
      <h1>프로필 설정</h1>
      <form onSubmit={btnHandler}>
        <div>
          <label htmlFor="nickname">닉네임(최대 8자)</label>
          <input
            id="nickname"
            value={nickName}
            onChange={handleNicknameChange}
            maxLength={8}
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <button type="submit" disabled={updateBtnMutation.isPending}>
          {updateBtnMutation.isPending ? "변경 중..." : "닉네임 변경하기"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
