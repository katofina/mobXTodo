import { makeAutoObservable } from "mobx";

const todoList = () => {
  return makeAutoObservable({
    tasks: [] as { title: string; id: number; data: string; time: string }[],
  });
};

export default todoList;
