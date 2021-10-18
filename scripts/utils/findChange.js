export const findChange = (json, key) => {
  const getIndex = (index) => {
    return json[json.length - index];
  };

  const getPerc = (index) => {
    const perc = () =>
      ((getIndex(1)[key] - getIndex(index)[key]) / getIndex(1)[key]) * 100.0;

    if (getIndex(index)) {
      return perc() ? perc() : 0;
    } else {
      return '';
    }
  };

  return {
    day: getPerc(2),
    week: getPerc(7),
    month: getPerc(30),
    halfYear: getPerc(180),
    year: getPerc(360),
  };
};
