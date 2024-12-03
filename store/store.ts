import { createContext, useContext } from "react";
import todoList from "./todoList";

const store = {
  todoList: todoList(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
