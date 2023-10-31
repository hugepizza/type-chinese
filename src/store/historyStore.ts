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
    (set) => ({
      typingHistory: [],
      addHistory: (h: TypingRecord) =>
        set((state) => {
          const newh = { ...state, history: [...state.typingHistory, h] };
          console.log("addHistory", h);
          return newh;
        }),
    }),
    {
      name: "typingHistory",
      version: 2,
    }
  )
);

export default useHistoryStore;
