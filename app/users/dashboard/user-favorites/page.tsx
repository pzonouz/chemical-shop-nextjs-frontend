/* eslint-disable @next/next/no-img-element */
"use client";
import { MdDelete } from "react-icons/md";
import {
  useFetchFavoritesQuery,
  useToggleFavoriteMutation,
} from "@/lib/features/api/api";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import Link from "next/link";
// import successToast from "@/app/utils/SuccessToast";
import errorToast from "@/app/utils/ErrorToast";
import { Favorite } from "@/app/types";

export default function UserFavoritesPage() {
  const { data: favorites, isFetching } = useFetchFavoritesQuery();
  const [toggleFavorite] = useToggleFavoriteMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    isFetching ? dispatch(setLoading()) : dispatch(unsetLoading());
  }, [dispatch, isFetching]);

  return (
    <div className="p-4 bg-base-200 rounded-xl w-full flex flex-col gap-2 items-center ">
      <div>
        {favorites?.map((favorite: Favorite) => (
          <div key={favorite.id} className=" flex flex-row items-center">
            <Link
              href={"/products/" + String(favorite.product).split(",")[1]}
              className="w-1/2 rounded-lg"
            >
              <img
                src={String(favorite.product).split(",")[2]}
                alt={String(favorite.product).split(",")[0]}
              />
            </Link>
            <Link
              href={"/products/" + String(favorite.product).split(",")[1]}
              className=" w-1/2 text-center"
            >
              <div>{String(favorite.product).split(",")[0]}</div>
            </Link>
            <MdDelete
              onClick={() =>
                (
                  document?.getElementById("favorite_delete_modal") as any
                )?.showModal()
              }
              className=" text-2xl text-error cursor-pointer"
            />
            <dialog
              id="favorite_delete_modal"
              className="modal modal-bottom w-full"
            >
              <div className="modal-box">
                <p className="py-4">آیا پاک شود؟</p>
                <form
                  method="dialog"
                  className=" flex items-center justify-around "
                >
                  <button
                    className="btn btn-error text-error-content"
                    onClick={() => {
                      dispatch(setLoading());
                      toggleFavorite(
                        parseInt(String(favorite.product).split(",")[1])
                      )
                        .unwrap()
                        .then(() => {
                          dispatch(unsetLoading());
                        })
                        .catch((err: any) => {
                          dispatch(unsetLoading());
                          errorToast(err);
                        });
                    }}
                  >
                    بله
                  </button>
                  <button className="btn btn-neutral">نه</button>
                </form>
              </div>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
