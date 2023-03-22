import { Enum } from "./Enum";
import { Panic } from "./panic";
import { none, Option, some } from "./option";

export class Result<V, E, I extends "error" | "ok" = "error" | "ok"> extends Enum<
  { error: E; ok: V },
  I
> {
  _v!: V;
  _e!: E;
  unwrap(): V {
    if (this.isError()) throw new Panic("called unwrap() on an error resukt\n" + this.value);
    return this.value as V;
  }

  unwrapOr(other: V): V {
    if (this.isError()) return other;
    return this.value as V;
  }

  unwrapOrElse(other: () => V): V {
    if (this.isError()) return other();
    return this.value as V;
  }

  ok(): Option<V> {
    if (this.isOk()) return some(this.value) as any;
    return none();
  }
  error(): Option<E> {
    if (this.isError()) return some(this.value);
    return none();
  }

  map<M>(mapper: (value: V) => M): Result<M, E, I> {
    if (this.isError()) return error(this.value);
    return ok(mapper(this.value as V));
  }

  mapError<M>(mapper: (error: E) => M): Result<V, M, I> {
    if (this.isOk()) return ok(this.value);
    return error(mapper(this.value as E));
  }

  isError(): this is Result<V, E, "error"> {
    return this.type === "error";
  }

  isOk(): this is Result<V, E, "ok"> {
    return this.type === "ok";
  }
}

export const ok = <V, E = any, I extends "ok" | "error" = "ok">(value: V) =>
  new Result<V, E, I>("ok" as any, value as any);
export const error = <E, V = any, I extends "ok" | "error" = "error">(error: E) =>
  new Result<V, E, I>("error" as any, error as any);
