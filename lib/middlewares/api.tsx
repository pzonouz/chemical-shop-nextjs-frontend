import fetchWithToken from "@/app/utils/FetchWithToken";
import { userInfoFetched } from "../features/entities/user";
import { toast } from "react-toastify";
import { showError } from "@/app/utils/ShowError";
import {
  categoriesFetched,
  categoryCreated,
  categoryDeleted,
  categoryUpdated,
} from "../features/entities/categories";
import { setLoading, unsetLoading } from "../features/utils/loading";

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
      } catch (error) {}
    }
    if (action.type === "categoriesGetApiFetchBegan") {
      next(action);
      try {
        dispatch(setLoading());
        const res = await fetch("x/api/categories");
        const responseData = await res.json();
        dispatch(unsetLoading());
        if (!res.ok) {
          throw new Error(responseData.error);
        }
        dispatch(categoriesFetched(responseData));
      } catch (error: any) {
        dispatch(unsetLoading());
        showError(error);
      }
    }
    if (action.type === "categoryDeleteApiBegan") {
      next(action);
      try {
        dispatch(setLoading());
        const res = await fetchWithToken(
          `/admin/api/categories/${action.payload}`,
          "DELETE",
          action.payload.token
        );
        const responseData = await res.json();
        dispatch(unsetLoading());
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
    if (action.type === "categoryUpdateApiFetchBegan") {
      next(action);
      try {
        dispatch(setLoading());
        const res = await fetchWithToken(
          `/admin/api/categories/${action.payload.id}`,
          "PATCH",
          "",
          action.payload.data
        );
        const responseData = await res.json();
        dispatch(unsetLoading());
        if (!res.ok) {
          throw new Error(responseData);
        }
        toast.success("با موفقیت انجام شد");
        dispatch(categoryUpdated(action.payload));
      } catch (err: unknown) {
        showError(err);
      }
    }
    next(action);
  };

export { api };
