const fetchWithToken = (
  url: string,
  method: string,
  token: string,
  data: any | undefined = undefined
) => {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
export default fetchWithToken;
