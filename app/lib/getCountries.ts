import countries from "world-countries";

const countriesFormatted = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latLang: country.latlng,
  region: country.region,
}));

export const useCountries = () => {
  const getAllCountries = () => countriesFormatted;
  const getCountryByLabel = (label: string) => {
    return countriesFormatted.find((country) => country.label === label);
  };

  return {
    getAllCountries,
    getCountryByLabel,
  };
};
