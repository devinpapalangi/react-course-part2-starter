import { create } from "zustand";

interface CounterStore {
  counter: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () =>
    set((state) =>
      state.counter > 0 ? { counter: state.counter - 1 } : { counter: 0 }
    ),
  reset: () => set({ counter: 0 }),
}));

export default useCounterStore;
