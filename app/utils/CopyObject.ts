export const objectCopy = (from: any, to: any) => {
  Object?.keys(from).map((key) => {
    (to as any)[key] = from[key];
  });
};
