export const removeDuplicated = (array: string[]) => {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
};
