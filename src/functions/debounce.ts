export type DebouncedFunction<FunctionType> = FunctionType & {
  clear: () => void;
};

export const debounce = <FunctionType extends Function>(func: FunctionType) => {
  let timeout: NodeJS.Timeout | null = null;
  const debounced = ((...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, 1000);
  }) as any as DebouncedFunction<FunctionType>;
  debounced.clear = () => {
    if (timeout) clearTimeout(timeout);
  };
  return debounced;
};
