import dayjs from "dayjs";
import { atom, selector, useRecoilState } from "recoil";
import { Task } from "../types/task";

export const tasksAtom = atom<Task[]>({
  key: "tasksAtom",
  default: [],
});

export const upcomingTaskAtom = atom<Task[]>({
  key: "upcomingTaskAtom",
  default: [],
});

export const upcomingTasksState = selector({
  key: "upcomingTasksState",
  get: ({ get }) => {
    const taskList = get(tasksAtom);
    const filter: Task[] = [];
    const now = dayjs();
    taskList.forEach((task) => {
      const input = dayjs(task.reminderDate);
      const diffDays = input.diff(now, "day");
      if (diffDays <= 7) {
        filter.push(task);
      }
    });
    return filter;
  },
});
