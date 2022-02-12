export type DebouncedFunction<FunctionType> = FunctionType & {
  clear: () => void;
};

export const debounce = <FunctionType extends Function>(func: FunctionType) => {
  let timeout: number | null = null;
  const debounced = ((...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, 1000);
  }) as unknown as DebouncedFunction<FunctionType>;
  debounced.clear = () => {
    if (timeout) clearTimeout(timeout);
  };
  return debounced;
};
