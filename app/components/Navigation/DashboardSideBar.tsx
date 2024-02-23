import classNames from "classnames";
import { useRouter } from "next/navigation";
import { DashboardItem } from "../data/Dashboard";

interface IDashboardSideBar {
  state: string;
  setState: any;
  items: DashboardItem[];
}

const DashboardSideBar = ({ state, setState, items }: IDashboardSideBar) => {
  const router = useRouter();
  return (
    <aside>
      <ul className="menu bg-base-200 rounded-box w-fit text-2xl m-y-auto">
        {items.map(({ icon, text }) => (
          <li key={text} className=" my-1">
            <a
              onClick={() => {
                text === "signOut"
                  ? router.push("/api/auth/signout")
                  : setState(text);
              }}
              className={classNames({ active: state === text })}
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashboardSideBar;
