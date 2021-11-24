const isNode = typeof module !== "undefined" && module.exports;

const nodeCrypto = isNode ? require("crypto") : null;

const nodePollyfill = <PropertyType>(name: string, property: PropertyType): PropertyType => {
  if (typeof window === "undefined" || typeof self === "undefined") return property;
  const windowOrSelf =
    ((window as any)?.[name] as any) ?? ((self as any)?.[name] as any) ?? property;
  if (typeof windowOrSelf === "function") {
    return windowOrSelf.bind(window ?? self);
  }
  return windowOrSelf;
};

const nodePollyfillFactory = <PropertyType>(
  name: string,
  property: () => PropertyType,
): PropertyType =>
  typeof window === "undefined" || typeof self === "undefined"
    ? property()
    : ((window as any)?.[name] as any) ?? ((self as any)?.[name] as any) ?? property();

export const atob = nodePollyfill("atob", (data: string) =>
  Buffer.from(data, "base64").toString("binary"),
);
export const btoa = nodePollyfill("btoa", (data: string) =>
  Buffer.from(data, "binary").toString("base64"),
);

export const crypto: Crypto = nodePollyfillFactory("crypto", () => nodeCrypto.webcrypto);
