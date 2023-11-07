import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TypingRecord } from "./typingStore";

export type History = {
  typingHistory: TypingRecord[];
  addHistory: (h: TypingRecord) => void;
};

const useHistoryStore = create<History>()(
  persist(
    (set, get) => ({
      typingHistory: [],
      addHistory: (h: TypingRecord) =>
        set({
          typingHistory: (get().typingHistory as TypingRecord[]).concat(h),
        }),
    }),
    {
      name: "typingHistory",
      version: 3,
    }
  )
);

export default useHistoryStore;
