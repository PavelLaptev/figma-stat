export const findChange = (json, key) => {
  const getIndex = (index) => {
    return json[json.length - index];
  };

  const getPerc = (index) => {
    return getIndex(index)
      ? ((getIndex(1)[key] - getIndex(index)[key]) / getIndex(1)[key]) * 100.0
      : '';
  };

  return {
    day: getPerc(2) ? getPerc(2) : 0,
    week: getPerc(7) ? getPerc(7) : 0,
    month: getPerc(30) ? getPerc(30) : 0,
    halfYear: getPerc(180) ? getPerc(180) : 0,
    year: getPerc(360) ? getPerc(360) : 0,
  };
};
