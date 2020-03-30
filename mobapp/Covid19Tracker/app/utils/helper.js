import RNCountry from "react-native-countries";
const COUNTRY_NAMES_WITH_CODE = RNCountry.getCountryNamesWithCodes;

export const formatNumber = (number) => {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const getCountryCode = (name) => {

  let countryName = name;
  if (name === 'China') {
    countryName = 'China mainland'
  } else if (name === 'US') {
    countryName = 'United States'
  }

  const country = COUNTRY_NAMES_WITH_CODE.find(value => value.name == countryName);
  return country && country.code
}