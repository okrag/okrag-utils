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

  // TODO: Russian, spanish, turkish, arabic, korean, chinease, japanease, portugal, german
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
];

export const regions: Record<string, string[]> = {
  en: ["US", "GB", "AU", "CA", "IN", "NZ", "ZA"],
  pl: ["PL"],
  fr: ["FR", "CA", "CH"],
};
