export const objectCopy = (from: any, to: any) => {
  if (Object == null) {
    return;
  }
  Object?.keys(from).map((key) => {
    (to as any)[key] = from[key];
  });
};
