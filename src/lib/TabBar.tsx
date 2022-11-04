interface TabBarProps {
  changeTab: (tab: string) => void;
  currentTab: string;
}

export const TabBar = ({ changeTab, currentTab }: TabBarProps) => {
  const inactiveClass =
    "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 hover:text-gray-300 cursor-pointer";
  const activeClass =
    "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active text-blue-500 border-blue-500";
  return (
    <div className="text-sm font-medium text-center  border-b  text-gray-400 border-gray-700 cursor-pointer">
      <ul className="flex flex-wrap -mb-px justify-center">
        <li className="mr-2">
          <div
            className={currentTab === "bingo" ? activeClass : inactiveClass}
            onClick={() => changeTab("bingo")}
          >
            Neue Ideen
          </div>
        </li>
        <li className="mr-2">
          <div
            className={currentTab === "felder" ? activeClass : inactiveClass}
            onClick={() => changeTab("felder")}
          >
            Bingo Felder
          </div>
        </li>
        <li className="mr-2">
          <div
            className={currentTab === "feedback" ? activeClass : inactiveClass}
            aria-current="page"
            onClick={() => changeTab("feedback")}
          >
            Feedback
          </div>
        </li>
      </ul>
    </div>
  );
};
