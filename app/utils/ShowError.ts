import { toast } from "react-toastify";

export function showError(err: any) {
  if (typeof err === "string") toast.error(err, { position: "top-right" });
  if (err instanceof Error) {
    toast.error(err.message || "خطایی در سرور رخ داده است", {
      position: "top-right",
    });
  }
}
