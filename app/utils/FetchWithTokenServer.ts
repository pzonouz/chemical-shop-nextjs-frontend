import { cookies } from "next/headers";

const fetchWithTokenServer = async (
  url: string,
  method: string,
  data: any | undefined = undefined
) => {
  const cookie = cookies();
  const token = cookie.get("next-auth.session-token");
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token!.value}`,
    },
    body: JSON.stringify(data),
  });
};

export default fetchWithTokenServer;
