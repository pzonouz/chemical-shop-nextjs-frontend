"use client";
import { setLoading, unsetLoading } from "@/lib/features/utils/loading";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const OneFileUploader = ({
  uploadedImageLinkSetter,
  uploadedImageLink,
}: {
  uploadedImageLinkSetter: any;
  uploadedImageLink: any;
}) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File>();
  const onFileUpload = async () => {
    try {
      const fileData = new FormData();
      if (!file) {
        return;
      }
      fileData.set("file", file!);
      dispatch(setLoading());
      const res = await fetch("/api/image-upload/", {
        headers: {},
        method: "POST",
        body: fileData,
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      dispatch(unsetLoading());
      const data = await res.json();
      uploadedImageLinkSetter(data.file);
    } catch (err: any) {
      dispatch(unsetLoading());
      toast.error(err.message, { position: "top-right" });
    }
  };
  useEffect(() => {
    onFileUpload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        data-max-size="1000"
        className="file-input file-input-bordered max-w-xs w-full"
        onChange={(e) => {
          setFile(e.target.files![0]);
        }}
      />
      {uploadedImageLink && (
        <div className=" flex gap-2 items-center">
          <AiFillCloseCircle
            className="text-error text-xl cursor-pointer"
            onClick={() => {
              uploadedImageLinkSetter(undefined);
            }}
          />
          <a
            href={uploadedImageLink}
            target="_blank"
            className=" link hover:link-hover"
          >
            مشاهده عکس
          </a>
        </div>
      )}
    </>
  );
};

export default OneFileUploader;
