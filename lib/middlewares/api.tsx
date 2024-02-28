import fetchWithToken from "@/app/utils/FetchWithToken";
import { userInfoFetched } from "../features/entities/user";

const api =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: any) => {
    if (action.type !== "apiFetchBegan") {
      return next(action);
    }
    next(action);
    try {
      const { url, token } = action.payload;
      const res = await fetchWithToken(url, "GET", token);
      if (!res.ok) {
        throw new Error((res as any).error);
      }
      const user = await res.json();
      dispatch(userInfoFetched(user));
    } catch (error) {}
  };

export { api };
