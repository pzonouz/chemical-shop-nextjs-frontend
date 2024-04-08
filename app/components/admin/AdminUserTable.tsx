/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import classNames from "classnames";
import {
  useDisableUserMutation,
  useFetchUsersQuery,
} from "@/lib/features/api/api";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import successToast from "@/app/utils/SuccessToast";
import ErrorToast from "@/app/utils/ErrorToast";
import { User, UserProfile } from "@/app/types";
import { useAppDispatch } from "@/lib/hooks";
import AdminUserForm from "./AdminUserForm";

const AdminUserTable = () => {
  const dispatch = useAppDispatch();
  const { data: userProfiles, isFetching } = useFetchUsersQuery();
  const [userToDisable, setUserToDisable] = useState<User>();
  const [editVisible, setEditVisible] = useState("");
  const [disableUser] = useDisableUserMutation();

  const onDisableUser = () => {
    disableUser(userToDisable!)
      .unwrap()
      .then(() => {
        successToast();
      })
      .catch((err: any) => {
        ErrorToast(err.status);
      });
  };

  useEffect(() => {
    isFetching ? dispatch(setLoading()) : dispatch(unsetLoading());
  }, [dispatch, isFetching]);

  return (
    <div className="overflow-x-auto w-full rounded-lg">
      <table className="table w-full">
        <thead className="w-full">
          <tr className="bg-base-200 w-full flex justify-between">
            <th className=" w-1/2">ایمیل</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles?.map((profile: UserProfile) => (
            <React.Fragment key={profile.id}>
              <tr className="flex bg-base-200 w-full justify-between items-center">
                <td className=" w-1/2">{profile?.user}</td>
                <td className=" flex gap-4 items-center">
                  <RiEdit2Line
                    className={classNames({
                      "text-xl text-info cursor-pointer": true,
                      "bg-error": editVisible === profile?.id,
                    })}
                    onClick={() => {
                      if (editVisible === profile?.id!) {
                        setEditVisible("");
                      }
                      if (editVisible !== profile?.id!) {
                        setEditVisible(profile?.id!);
                      }
                    }}
                  />
                </td>
              </tr>
              {editVisible === profile.id && (
                <tr className=" w-full">
                  <td className="w-full">
                    <AdminUserForm profile={profile} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {/* delete window */}
    </div>
  );
};
export default AdminUserTable;
