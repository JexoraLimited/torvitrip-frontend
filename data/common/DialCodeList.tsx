import CountryList from "country-list-with-dial-code-and-flag";
import CountryFlagSvg from "country-list-with-dial-code-and-flag/dist/flag-svg";

export const countryList =
  typeof window !== "undefined" ? CountryList.getAll() : [];

export const dialCodeList =
  typeof window !== "undefined"
    ? countryList.map((country) => ({
        code: country.code,
        dial: country.dial_code,
        country: CountryFlagSvg[country.code],
        name: country.name,
      }))
    : [];
