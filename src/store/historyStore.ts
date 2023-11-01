import { create } from "zustand";
import { TypingState } from "./appStore";
import { persist } from "zustand/middleware";
export type TypingRecord = TypingState & {
  startAt: Date;
  textbook: string;
};

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
