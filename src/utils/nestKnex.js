function nestKnex(knexData, innerKnexDataProperties, innerPropertyName) {
  let formattedData = [];
  let innerKnexData = {};
  let outerKnexData = {};
  for (const element of knexData ) {
    for (const key in element) {
      if (innerKnexDataProperties.includes(key)) {
        innerKnexData[key] = element[key];
      } else {
        outerKnexData[key] = element[key];
      }
    }
    outerKnexData[innerPropertyName] = innerKnexData;
    formattedData.push(outerKnexData); 
  }
  return formattedData;
}


module.exports = nestKnex;