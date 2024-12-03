import { makeAutoObservable } from "mobx";

const todoList = () => {
  return makeAutoObservable({
    tasks: [] as { title: string; id: string; date: string; made: boolean }[],
  });
};

export default todoList;
