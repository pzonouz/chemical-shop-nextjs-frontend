export const ToPersianDigit = (number: string) => {
  number = number.replaceAll("1", "۱");
  number = number.replaceAll("2", "۲");
  number = number.replaceAll("3", "۳");
  number = number.replaceAll("4", "۴");
  number = number.replaceAll("5", "۵");
  number = number.replaceAll("6", "۶");
  number = number.replaceAll("7", "۷");
  number = number.replaceAll("8", "۸");
  number = number.replaceAll("9", "۹");
  return number;
};
