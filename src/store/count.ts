import { create } from "zustand";
import { combine } from "zustand/middleware";

// combine 사용하는 이유?
// state 타입 자동 추론(첫 번째 인수를 기준으로)
export const UseCountStore = create(
  combine({ count: 0 }, (set, get) => ({
    actions: {
      increase: () => {
        get();
        set((store) => ({
          count: store.count + 1,
        }));
      },
      decrease: () => {
        set((store) => ({
          count: store.count - 1,
        }));
      },
    },
  })),
);

export const useCount = () => {
  const count = UseCountStore((store) => store.count);
  return count;
};

export const useIncreaseCount = () => {
  const increase = UseCountStore((store) => store.actions.increase);
  return increase;
};

export const useDecreaseCount = () => {
  const decrease = UseCountStore((store) => store.actions.decrease);
  return decrease;
};
