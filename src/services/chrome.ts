/*global chrome*/

import { Task } from "../types/task";

export const syncSet = (key: string, value: Task[], callback: () => void) => {
  chrome.storage.sync.set({ [key]: value }, callback);
};

export const syncGet = (key: string, callback: (result: { [key: string]: unknown }) => void) => {
  chrome.storage.sync.get([key], callback);
};
