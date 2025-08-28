// locale can be "en-NG" for Nigeria
export const compactNumber = (value, locale = "en-NG") =>
  new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
}).format(value);
