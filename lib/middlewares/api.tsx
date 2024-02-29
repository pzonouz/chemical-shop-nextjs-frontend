import fetchWithToken from "@/app/utils/FetchWithToken";
import { userInfoFetched } from "../features/entities/user";
import { toast } from "react-toastify";
import { showError } from "@/app/utils/ShowError";
import {
  categoriesFetched,
  categoryCreated,
  categoryDeleted,
} from "../features/entities/categories";

const api =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  async (action: any) => {
    if (action.type === "userApiFetchBegan") {
      next(action);
      try {
        const { url, token } = action.payload;
        const res = await fetchWithToken(url, "GET", token);
        if (!res.ok) {
          throw new Error((res as any).error);
        }
        const user = await res.json();
        dispatch(userInfoFetched(user));
      } catch (error) {
        if (error instanceof Error) {
          toast.error("خطا در دریافت اطلاعات کاربر", { position: "top-right" });
        }
      }
    }
    if (action.type === "categoriesGetApiFetchBegan") {
      next(action);
      try {
        const res = await fetch("/api/categories");
        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.error);
        }
        dispatch(categoriesFetched(responseData));
      } catch (error: any) {
        showError(error);
      }
    }
    if (action.type === "categoryDeleteApiBegan") {
      next(action);
      try {
        const res = await fetchWithToken(
          `/admin/api/categories/${action.payload}`,
          "DELETE",
          action.payload.token
        );
        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData.error);
        }
        dispatch(categoryDeleted(action.payload));
      } catch (err) {
        showError(err);
      }

      next(action);
    }
    if (action.type === "categoryCreateApiFetchBegan") {
      next(action);
      try {
        const res = await fetchWithToken(
          "/admin/api/categories",
          "POST",
          "",
          action.payload
        );
        const responseData = await res.json();
        if (!res.ok) {
          throw new Error(responseData);
        }
        toast.success("با موفقیت انجام شد");
        dispatch(categoryCreated(action.payload));
      } catch (err: unknown) {
        showError(err);
      }
    }
    next(action);
  };

export { api };
