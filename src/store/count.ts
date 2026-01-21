import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// immer
// 속성에 직접 접근(불변성 관리) -> 업데이트 코드 간결
export const UseCountStore = create(
  immer(
    // combine 사용하는 이유?
    // state 타입 자동 추론(첫 번째 인수를 기준으로)
    combine({ count: 0 }, (set) => ({
      actions: {
        increase: () => {
          set((state) => {
            state.count += 1;
          });
        },
        decrease: () => {
          set((state) => {
            state.count -= 1;
          });
        },
      },
    })),
  ),
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
