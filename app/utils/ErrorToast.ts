import { toast } from "react-toastify";

export default function ErrorToast(err: any) {
  toast.error(err, { position: "top-right" });
}
