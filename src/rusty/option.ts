import { Enum } from "./Enum";
import { Panic } from "./panic";
import { ok, Result } from "./result";

export class Option<T, I extends "some" | "none" = "some" | "none"> extends Enum<
  { none: undefined; some: T },
  I
> {
  unwrap(): T {
    if (this.isNone()) throw new Panic("called unwrap() on an none option");
    return this.value as T;
  }

  unwrapOr(other: T): T {
    if (this.isNone()) return other;
    return this.value as T;
  }

  unwrapOrElse(other: () => T): T {
    if (this.isNone()) return other();
    return this.value as T;
  }

  unwrapOrError<E>(error: E): Result<T, E> {
    if (this.isNone()) return new Result("error", error);
    return ok(this.value as T);
  }

  map<M>(mapper: (value: T) => M): Option<M, I> {
    if (this.isNone()) return none() as any;
    return some(mapper(this.value as T)) as any;
  }

  isNone(): this is Option<T, "none"> {
    return this.type === "none";
  }

  isSome(): this is Option<T, "some"> {
    return this.type === "some";
  }
}

export const some = <T, K extends "some" | "none" = "some">(value: T) =>
  new Option<T, K>("some" as any, value as any);
export const none = <T = any, K extends "some" | "none" = "none">() =>
  new Option<T, K>("none" as any, undefined as any);
