export const buildAddress = addressObject => {
  if (!addressObject) return '';
  const { street, region, city, countryId, postCode } = addressObject;
  const addressArr = [];
  if (street) addressArr.push(...street);
  if (region?.region) addressArr.push(region.region);
  if (city) addressArr.push(city);
  if (countryId) addressArr.push(countryId); //TODO should return country name map from country list
  if (postCode) addressArr.push(postCode);

  return addressArr.join(', ');
};
