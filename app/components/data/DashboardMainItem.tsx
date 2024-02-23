import classNames from "classnames";
import { ReactNode } from "react";

const DashboardMainItem = ({
  state,
  innerHTML,
  text,
}: {
  state: string;
  innerHTML: any;
  text: string;
}) => {
  return (
    <main
      className={classNames({
        "bg-base-200 w-full rounded-2xl p-4": true,
        " hidden": state !== text,
      })}
    >
      {innerHTML}
    </main>
  );
};

export default DashboardMainItem;
