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
    day: getPerc(2),
    week: getPerc(7),
    month: getPerc(30),
    halfYear: getPerc(180),
    year: getPerc(360),
  };
};
