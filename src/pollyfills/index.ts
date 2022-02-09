/// <reference lib="webworker" />

let isNode = false;
try {
  isNode = !!(
    module?.exports &&
    process?.release?.name?.search(/node|io.js/) !== -1 &&
    Object.prototype.toString.call(global?.process) === "[object process]"
  );
} catch (e) {
  isNode = false;
}

const nodeCrypto = isNode ? require("crypto") : null;

declare const self: ServiceWorkerGlobalScope;

const nodePollyfill = <Name extends Extract<keyof Window, keyof ServiceWorkerGlobalScope>>(
  name: Name,
  property: Window[Name],
): Window[Name] => {
  if (isNode) return property;

  const windowOrSelf = self[name] as unknown as Window[Name];

  if (typeof windowOrSelf === "undefined")
    throw new Error("Property is not defined on neither window nor self");

  if (typeof windowOrSelf === "function") return (windowOrSelf as any).bind(self);

  return windowOrSelf;
};

const nodePollyfillFactory = <Name extends Extract<keyof Window, keyof ServiceWorkerGlobalScope>>(
  name: Name,
  property: () => Window[Name],
): Window[Name] =>
  (isNode ? nodePollyfill(name, property()) : nodePollyfill(name, null as any)) as any;

export const atob = nodePollyfill("atob", (data: string) =>
  Buffer.from(data, "base64").toString("binary"),
);
export const btoa = nodePollyfill("btoa", (data: string) =>
  Buffer.from(data, "binary").toString("base64"),
);

export const crypto = nodePollyfillFactory("crypto", () => nodeCrypto.webcrypto);
