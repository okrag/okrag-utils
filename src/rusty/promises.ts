interface Promise<T> {
  await: T;
}

Object.defineProperty(Promise.prototype, "await", {
  get() {
    throw new Error(
      "UNREACHABLE: This code should've been replaced by your transpiler.\n As of now it is not possible to use this function without a transpiler!",
    );
  },
});
