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
  return {
    isLogin: false,
    setIsLogin: (status) => {
      return set({ isLogin: status });
    },
  };
});

export { useUserStore, useLoginStatus };
