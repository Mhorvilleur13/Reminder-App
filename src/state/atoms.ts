import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { atom, selector, useRecoilState } from "recoil";
import { Task } from "../types/task";

dayjs.extend(isToday);

export const tasksAtom = atom<Task[]>({
  key: "tasksAtom",
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

export const todayTaskState = selector({
  key: "todayTaskState",
  get: ({ get }) => {
    const taskList = get(tasksAtom);
    const todayFilter: Task[] = [];
    taskList.forEach((task) => {
      if (dayjs(task.reminderDate).isToday() === true) {
        todayFilter.push(task);
      }
    });
    return todayFilter;
  },
});
