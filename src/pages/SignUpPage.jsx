import AuthForm from "../component/AuthForm";
import { useNavigate } from "react-router-dom";
import Api from "../api/auth";
import { useUserStore, useLoginStatus } from "../zustand/mbtiStore";
import CompNavBar from "../component/CompNavBar";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useLoginStatus();
  const { isLoginMode, setIsLoginMode } = useUserStore((state) => state);
  const { formState, onChangeHandler, resetForm } = AuthForm({
    id: "",
    password: "",
    nickname: "",
  });
  const { id, password, nickname } = formState;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        const { data } = await Api.Api.post("/login", {
          id: formState.id,
          password: formState.password,
        });

        alert("로그인이 완료되었습니다.");

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userNick", data.nickname);
        localStorage.setItem("userInfo", data.userId);
        const token = localStorage.getItem("accessToken");
        if (token) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }

        navigate("/");
      } else {
        await Api.Api.post("/register", {
          id: formState.id,
          password: formState.password,
          nickname: formState.nickname,
        });

        alert("회원가입이 완료되었습니다.");

        setIsLoginMode(true);

        resetForm();
      }
    } catch (error) {
      console.error(error);
      alert("에러가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <CompNavBar />
      <div className="h-screen bg-gray-100 flex justify-center">
        <div className="py-6 px-8 mt-20 bg-white rounded shadow-xl h-[550px] w-[500px]">
          <h1>{isLoginMode ? "로그인" : "회원가입"}</h1>
          <hr />
          <form onSubmit={onSubmitHandler}>
            <label className="block text-gray-800 font-bold">ID:</label>
            <input
              name="id"
              placeholder="아이디 (4~10글자)"
              minLength={4}
              maxLength={10}
              value={id}
              onChange={onChangeHandler}
              className="w-full border border-gray-300 py-3 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            ></input>
            <label className="block text-gray-800 font-bold">PassWord:</label>
            <input
              name="password"
              placeholder="비밀번호 (4~15글자)"
              minLength={4}
              maxLength={15}
              value={password}
              onChange={onChangeHandler}
              className="w-full border border-gray-300 py-3 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            ></input>
            {!isLoginMode && (
              <>
                <label className="block text-gray-800 font-bold">
                  NickName:
                </label>
                <input
                  name="nickname"
                  placeholder="닉네임 (최대 8자)"
                  minLength={1}
                  maxLength={8}
                  value={nickname}
                  onChange={onChangeHandler}
                  className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
                ></input>
              </>
            )}
            <button className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">
              {isLoginMode ? "로그인" : "회원가입"}
            </button>
            <br />
            <span onClick={() => setIsLoginMode(!isLoginMode)}>
              {!isLoginMode ? "로그인으로" : "회원가입으로"}
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
