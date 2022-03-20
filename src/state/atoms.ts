import { atom, useRecoilState } from "recoil";
import { Task } from "../types/task";

export const tasksAtom = atom<Task[]>({
  key: "tasksAtom",
  default: [],
});

export const upcomingAtom = atom<Task[]>({
  key: "upcomingAtom",
  default: [],
});
