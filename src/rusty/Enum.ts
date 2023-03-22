export class Enum<Options extends Record<string, unknown>, Type extends keyof Options> {
  constructor(protected type: Type, value: Options[Type]) {
    (this as any).value = value;
  }

  value!: Options[Type];
}
