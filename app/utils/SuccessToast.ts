import { toast } from "react-toastify";

export default function successToast() {
  toast.success("با موفقیت انجام شد", { position: "top-right" });
}
export function successToastWithMsg(msg: string) {
  toast.success(`با موفقیت انجام شد${msg}`, { position: "top-right" });
}
