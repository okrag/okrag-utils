import {
  Language,
  MessagesDictType,
  MessagesNamespaces,
  regions,
  TranslationTree,
} from "./index.ts";
import { EventsManager } from "../events/index.ts";

export type EventType = "translationTreeChange" | "languageChange";

export class Localization<MessagesType extends MessagesDictType> extends EventsManager<EventType> {
  private _language: Language;

  get language() {
    return this._language;
  }
  set language(lang: Language) {
    this._language = lang;
    this.createTranslationTree();
    localStorage.setItem(this.langaugeStorageKey, lang);
    this.dispachEvent("languageChange");
  }

  translations: TranslationTree<MessagesType> = {} as any;

  constructor(
    public readonly messages: MessagesType,
    public defaultLanguage: Language,
    public languagesList: Language[],
    public langaugeStorageKey: string,
  ) {
    super();
    this._language = defaultLanguage;
  }

  private parseLanguage = (lang: string): Language[] => {
    const langs = (() => {
      if (lang.match(/^[a-z]{2}$/))
        return (regions[lang]?.map((region) => `${lang}-${region}`) ?? []) as any;
      if (lang.match(/^[a-z]{2}-[a-z]{2}$/)) {
        const [language, region] = lang.split("-");
        return [`${language}-${region.toUpperCase()}`] as any;
      }
      const splited = lang.split("-");
      return [`${splited[0]}-${splited[1]}`];
    })();

    return langs.flatMap((lang: string) => {
      if (!this.languagesList.includes(lang as any)) {
        const [language] = lang.split("-");
        if (!regions[language]) return [];
        return regions[language].map((region) => `${language}-${region}`) as any;
      }
      return lang;
    });
  };

  getLanguage() {
    const savedLanguage = localStorage.getItem(this.langaugeStorageKey) as Language;
    if (savedLanguage && this.languagesList.includes(savedLanguage)) {
      this._language = savedLanguage;
      return this;
    }
    const languages = new Set([
      ...this.parseLanguage((window.navigator as any)?.language ?? "en-US"),
      ...((window.navigator as any)?.languages?.flatMap(this.parseLanguage) ?? []),
    ]);

    let supported = false;

    languages.forEach((lang) => {
      if (supported) return;

      if (this.languagesList.includes(lang)) {
        this._language = lang;
        supported = true;
      }
    });

    if (!supported) this._language = this.defaultLanguage;
    return this;
  }

  createTranslationTree() {
    this.translations = {} as any;
    (Object.keys(this.messages) as MessagesNamespaces<MessagesType>[]).forEach((namespace) => {
      const messages = this.messages[namespace];
      this.translations[namespace] = {};

      for (const key in messages) {
        if (Object.prototype.hasOwnProperty.call(messages, key)) {
          if (!messages[key][this.language]) {
            (this.translations as any)[namespace][key] =
              this.messages.TranslationErrors.noTranslation[this.language];
          } else {
            (this.translations as any)[namespace][key] = messages[key][this.language];
          }
        }
      }
    });
    this.dispachEvent("translationTreeChange");
    return this;
  }
}
