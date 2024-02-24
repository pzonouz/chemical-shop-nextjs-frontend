import { getCookie } from "cookies-next";

const fetchWithTokenClient = (
  url: string,
  method: string,
  data: any | undefined = undefined
) => {
  const token = getCookie("next-auth.session-token");
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};
export default fetchWithTokenClient;
