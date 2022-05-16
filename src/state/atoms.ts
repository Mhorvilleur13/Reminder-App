import { atom, selector } from "recoil";
import { Task } from "../types/task";
import dayjs from "../services/timeUtil";

export const tasksAtom = atom<Task[]>({
  key: "tasksAtom",
  default: [],
});

export const completedTaskAtom = atom<Task[]>({
  key: "completedTaskAtom",
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
      if (diffDays <= 7 && input.isAfter(dayjs())) {
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

export const missedTaskState = selector({
  key: "missedTaskState",
  get: ({ get }) => {
    const taskList = get(tasksAtom);
    const missedFilter: Task[] = [];
    taskList.forEach((task) => {
      if (dayjs().isAfter(dayjs(task.reminderDate))) {
        if (dayjs().format("H:m") > task.reminderTime) {
          missedFilter.push(task);
        }
      }
    });
    return missedFilter;
  },
});

export const recurringTaskState = selector({
  key: "recurringTaskState",
  get: ({ get }) => {
    const taskList = get(tasksAtom);
    const recurringFilter: Task[] = [];
    taskList.forEach((task) => {
      if (task.recurring === true) {
        recurringFilter.push(task);
      }
    });
    return recurringFilter;
  },
});
