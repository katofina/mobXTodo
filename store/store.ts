import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Item {
  title: string;
  id: string;
  date: Date;
  made: boolean;
}

interface TasksState {
  tasks: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  changeMadeProperty: (id: string) => void;
}

const storage = {
  getItem: async (key: string) => {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};

const useTasksStore = create<TasksState>()(
  persist(
    devtools(
      immer((set) => ({
        tasks: [],
        addItem: (item: Item) =>
          set((state) => {
            const newArr = state.tasks
              .concat(item)
              .sort((a, b) => +a.date - +b.date);
            state.tasks = newArr;
          }),
        removeItem: (id: string) =>
          set((state) => {
            state.tasks = state.tasks.filter((item: Item) => item.id !== id);
          }),
        changeMadeProperty: (id) =>
          set((state) => {
            state.tasks = state.tasks.map((item: Item) =>
              item.id === id ? { ...item, made: !item.made } : item,
            );
          }),
      })),
    ),
    {
      name: "tasksStore",
      version: 1,
      onRehydrateStorage: (state) => {
        state.tasks = state.tasks.map((task) => ({
          ...task,
          date: new Date(task.date),
        }));
      },
      storage,
    },
  ),
);

export default useTasksStore;
