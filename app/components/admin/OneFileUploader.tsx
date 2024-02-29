import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OneFileUploader = ({
  uploadedImageLinkSetter,
  uploadedImageLink,
}: {
  uploadedImageLinkSetter: any;
  uploadedImageLink: any;
}) => {
  const [file, setFile] = useState<File>();
  const onFileUpload = async () => {
    try {
      const fileData = new FormData();
      if (!file) {
        return;
      }
      fileData.set("file", file!);
      const res = await fetch("/admin/api/images", {
        method: "POST",
        body: fileData,
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.code);
        throw new Error(data.code);
      }
      uploadedImageLinkSetter(data.path);
      toast.success("موفق");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    onFileUpload();
  }, [file]);

  return (
    <>
      <input
        type="file"
        className="file-input file-input-bordered max-w-xs w-full"
        onChange={(e) => {
          setFile(e.target.files![0]);
        }}
      />
      {uploadedImageLink && (
        <a
          href={uploadedImageLink}
          target="_blank"
          className=" link hover:link-hover"
        >
          مشاهده عکس
        </a>
      )}
    </>
  );
};

export default OneFileUploader;
