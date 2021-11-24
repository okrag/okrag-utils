declare type DebouncedFunction<FunctionType> = FunctionType & {
    clear: () => void;
};
export declare const debounce: <FunctionType extends Function>(func: FunctionType) => DebouncedFunction<FunctionType>;
export {};
