/*global chrome*/

export const syncSet = (key: string, value: string, callback: () => void) => {
  chrome.storage.sync.set({ [key]: value }, callback);
};

export const syncGet = (key: string, callback: (result: { [key: string]: unknown }) => void) => {
  chrome.storage.sync.get([key], callback);
};
