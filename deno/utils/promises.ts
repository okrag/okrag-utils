export type State<ReturnType> = [ReturnType | null, Error | null];

export const $ = async <ReturnType>(promise: Promise<ReturnType>): Promise<State<ReturnType>> => {
  try {
    return [await promise, null];
  } catch (err) {
    return [null, err as Error];
  }
};

export const injectPromise = () => {
  (Promise.prototype as any).$ = function () {
    return $(this);
  };
};
