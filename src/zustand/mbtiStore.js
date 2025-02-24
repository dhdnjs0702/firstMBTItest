import { create } from "zustand";

const useUserStore = create((set) => {
  return {
    isLoginMode: true,
    setIsLoginMode: (mode) => {
      return set({ isLoginMode: mode });
    },
  };
});

const useLoginStatus = create((set) => {
  const token = localStorage.getItem("accessToken");
  return {
    isLogin: !!token,
    setIsLogin: (status) => {
      return set({ isLogin: status });
    },
  };
});

const useNickName = create((set) => {
  return {
    nickName: "",
    setNickName: (newNick) => {
      return set({ nickName: newNick });
    },
  };
});

const useResults = create((set) => {
  return {
    results: [],
    setResults: (data) => {
      return set({ results: [...data] });
    },
  };
});

export { useUserStore, useLoginStatus, useNickName, useResults };
