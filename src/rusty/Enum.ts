export class Enum<Options extends Record<string, unknown>, Type extends keyof Options> {
  constructor(protected type: Type, value: Options[Type]) {
    (this as any).value = value;
  }

  match<Returns extends Record<keyof Options, unknown>>(matcher: {
    [Key in keyof Options]: (val: Options[Key]) => Returns[Key];
  }) {
    return matcher[this.type](this.value);
  }

  value!: Options[Type];
}
