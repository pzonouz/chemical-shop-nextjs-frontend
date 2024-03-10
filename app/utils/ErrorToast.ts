import { toast } from "react-toastify";

export default function errorToast(err: any) {
  toast.error(err, { position: "top-right" });
}
