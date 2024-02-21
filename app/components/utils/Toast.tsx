import { IoMdClose } from "react-icons/io";
import { string } from "zod";
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
          className={`rounded-md bg-${type} text-base-200 mt-6 flex flex-row items-center`}
        >
          <div
            className=" p-2 self-start cursor-pointer hover:text-neutral"
            onClick={() => {
              stateSetter(null);
            }}
          >
            <IoMdClose />
          </div>
          <div className={`alert alert-${type} text-base-200 pl-8`}>{text}</div>
        </div>
      )}
    </>
  );
};

export default Toast;
