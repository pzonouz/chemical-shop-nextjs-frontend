import { IoMdClose } from "react-icons/io";
import classNames from "classnames";
interface Props {
  state: any;
  stateSetter: any;
  text: string;
  type: string;
}

const Toast = ({ state, stateSetter, text, type }: Props) => {
  return (
    <>
      {state && (
        <div
          className={classNames({
            "rounded-md text-base-200 mt-6 flex flex-row items-center": true,
            "bg-error": type === "error",
            "bg-success": type === "success",
          })}
        >
          <div
            className=" p-2 self-start cursor-pointer hover:text-neutral"
            onClick={() => {
              stateSetter(null);
            }}
          >
            <IoMdClose />
          </div>
          <div
            className={classNames({
              "alert text-base-200 pl-8": true,
              "alert-error": type === "error",
              "alert-success": type === "success",
            })}
          >
            {text}
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
