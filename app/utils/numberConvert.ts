export const textToNumber = (text: string) => {
  return parseInt(text?.replaceAll(",", ""));
};
export const textToThousandSeparated = (textNumber: string | number) => {
  const expression = /\B(?=(\d{3})+(?!\d))/g;
  if (typeof textNumber === "string") {
    // const expression = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/;

    return expression.exec(textNumber);
  }
  if (typeof textNumber === "number") {
    // const expression = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/;
    // const expression = /\B(?=(\d{3})+(?!\d))/g;
    return textNumber.toString().replace(expression, ",");
  }
};
