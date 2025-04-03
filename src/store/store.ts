import { create } from "zustand";
import api from "../api/Api";

interface GlobalState {
  accessToken: string;
  user: any;
  logOut: () => void;
}

const useGlobalStore = create<GlobalState>((set) => {
  const ls_string = localStorage.getItem("auth");
  if (!ls_string) {
    return {
      accessToken: "",
      user: null,
      logOut: () => {},
    };
  }

  const ls = JSON.parse(ls_string);
  console.log("ls", ls);

  api.defaults.headers.Authorization = `Bearer ${ls.accessToken}`;

  return {
    accessToken: ls.accessToken,
    user: ls.user,
    logOut: () => {
      localStorage.removeItem("auth");
      set({
        accessToken: "",
        user: null,
      });
    },
  };
});

export default useGlobalStore;
