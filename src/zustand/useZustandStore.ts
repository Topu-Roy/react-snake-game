"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// types
type ScoreStoreType = {
  highScore: number;
  updateHighScore: (newScore: number) => void;
};
type AttemptsStoreType = {
  attempts: number;
  updateAttempts: (attempt: number) => void;
};

export const useScoreStore = create<
  ScoreStoreType,
  [["zustand/persist", AttemptsStoreType]]
>(
  persist(
    (set) => ({
      highScore: 0,
      updateHighScore: (newScore) => set(() => ({ highScore: newScore })),
    }),
    {
      name: "highScore",
      getStorage: () => localStorage,
    }
  )
);

export const useAttemptsStore = create<
  AttemptsStoreType,
  [["zustand/persist", AttemptsStoreType]]
>(
  persist(
    (set) => ({
      attempts: 0,
      updateAttempts: (attempt) =>
        set((state) => ({ attempts: state.attempts + attempt })),
    }),
    {
      name: "Attempts",
      getStorage: () => localStorage,
    }
  )
);
