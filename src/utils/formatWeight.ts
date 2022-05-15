export const formatWeight = (weight: number) => {
  if (weight > 999) {
    return (weight / 1000).toFixed(2) + ' Kg';
  } else {
    return weight + ' gramos';
  }
};
