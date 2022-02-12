import { Language } from "./language.ts";

export interface MessagesDictType extends Record<string, Record<string, Partial<Message>>> {
  TranslationErrors: {
    noTranslation: Partial<Message>;
  };
}

export type MessagesNamespaces<MessagesType> = Extract<keyof MessagesType, string>;

export type Message = Record<Language, string>;

export type PossibleKeys<
  MessagesType extends MessagesDictType,
  Namespace extends MessagesNamespaces<MessagesType>,
> = Extract<keyof MessagesType[Namespace], string>;

// Best solution I could come up with, I don't think it's possible to do it better
export type PossibleKeysCombined<
  MessagesType extends MessagesDictType,
  Namespaces extends MessagesNamespaces<MessagesType>[],
> =
  | PossibleKeys<MessagesType, Namespaces[0]>
  | PossibleKeys<MessagesType, Namespaces[1]>
  | PossibleKeys<MessagesType, Namespaces[2]>
  | PossibleKeys<MessagesType, Namespaces[3]>
  | PossibleKeys<MessagesType, Namespaces[4]>
  | PossibleKeys<MessagesType, Namespaces[5]>
  | PossibleKeys<MessagesType, Namespaces[6]>
  | PossibleKeys<MessagesType, Namespaces[7]>
  | PossibleKeys<MessagesType, Namespaces[8]>
  | PossibleKeys<MessagesType, Namespaces[9]>
  | PossibleKeys<MessagesType, Namespaces[10]>
  | PossibleKeys<MessagesType, Namespaces[11]>
  | PossibleKeys<MessagesType, Namespaces[12]>
  | PossibleKeys<MessagesType, Namespaces[13]>
  | PossibleKeys<MessagesType, Namespaces[14]>
  | PossibleKeys<MessagesType, Namespaces[15]>;

export type TranslationsMap<
  MessagesType extends MessagesDictType,
  MessagesKeys extends MessagesNamespaces<MessagesType>[],
> = {
  [P in PossibleKeysCombined<MessagesType, MessagesKeys>]: (
    args?: Record<string, string | undefined>,
  ) => string;
} & {
  [P in `${PossibleKeysCombined<MessagesType, MessagesKeys>}Message`]: string;
};
export type SingleTranslationsMap<
  MessagesType extends MessagesDictType,
  MessagesKeys extends MessagesNamespaces<MessagesType>,
> = {
  [P in PossibleKeys<MessagesType, MessagesKeys>]: (
    args?: Record<string, string | undefined>,
  ) => string;
} & {
  [P in `${PossibleKeys<MessagesType, MessagesKeys>}Message`]: string;
};

export type TranslationTree<MessagesType extends MessagesDictType> = Record<
  MessagesNamespaces<MessagesType>,
  Record<string, string>
>;

export type UniversalTranslationsMap = Record<
  string,
  ((args?: Record<string, string | undefined>) => string) | string
>;
