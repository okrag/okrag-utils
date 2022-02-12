export enum Language {
  // English
  EN_US = "en-US",
  EN_AU = "en-AU",
  EN_CA = "en-CA",
  EN_IN = "en-IN",
  EN_NZ = "en-NZ",
  EN_ZA = "en-ZA",
  EN_GB = "en-GB",

  // Polish
  PL_PL = "pl-PL",

  // French
  FR_FR = "fr-FR",
  FR_CA = "fr-CA",
  FR_CH = "fr-CH",

  // Spanish
  ES_AR = "es-AR",
  ES_CL = "es-CL",
  ES_CO = "es-CO",
  ES_CR = "es-CR",
  ES_HN = "es-HN",
  ES_419 = "es-419",
  ES_MX = "es-MX",
  ES_PE = "es-PE",
  ES_ES = "es-ES",
  ES_US = "es-US",
  ES_UY = "es-UY",
  ES_VE = "es-VE",

  // TODO: Russian, turkish, arabic, korean, chinease, japanease, portugal, german
}

interface LanguageRepresentation {
  display: string;
  language: Language;
}

export const languagesWithDisplaynameList: LanguageRepresentation[] = [
  { display: "English (United States)", language: Language.EN_US },
  { display: "English (Austraila)", language: Language.EN_AU },
  { display: "English (Canada)", language: Language.EN_CA },
  { display: "English (India)", language: Language.EN_IN },
  { display: "English (New Zeland)", language: Language.EN_NZ },
  { display: "English (South Africa)", language: Language.EN_ZA },
  { display: "English (United Kingdom)", language: Language.EN_GB },

  { display: "Polski (Polska)", language: Language.PL_PL },

  { display: "Français (France)", language: Language.FR_FR },
  { display: "Français (Canada)", language: Language.FR_CA },
  { display: "Français (Suisse)", language: Language.FR_CH },

  { display: "Español (Argentina)", language: Language.ES_AR },
  { display: "Español (Chile)", language: Language.ES_CL },
  { display: "Español (Colombia)", language: Language.ES_CO },
  { display: "Español (Costa Rica)", language: Language.ES_CR },
  { display: "Español (Honduras)", language: Language.ES_HN },
  { display: "Español (Latinoamérica)", language: Language.ES_419 },
  { display: "Español (México)", language: Language.ES_MX },
  { display: "Español (Perú)", language: Language.ES_PE },
  { display: "Español (España)", language: Language.ES_ES },
  { display: "Español (Estados Unidos)", language: Language.ES_US },
  { display: "Español (Uruguay)", language: Language.ES_UY },
  { display: "Español (Venezuela)", language: Language.ES_VE },
].sort((a, b) => a.display.localeCompare(b.display));

export const regions: Record<string, string[]> = {
  en: ["US", "GB", "AU", "CA", "IN", "NZ", "ZA"],
  pl: ["PL"],
  fr: ["FR", "CA", "CH"],
};
