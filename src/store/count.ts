import { create } from "zustand";
import { combine, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const UseCountStore = create(
  subscribeWithSelector(
    // immer
    // 속성에 직접 접근(불변성 관리) -> 업데이트 코드 간결
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
  ),
);

// count 값 구독 -> 변경을 감지하면 콜백함수 실행
UseCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    // Listener
    console.log(count, prevCount);

    // store 불러오기
    // const store = UseCountStore.getState();
    // store 업데이트
    // UseCountStore.setState((store) => ({ count: 10 }));
  },
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
