import useAppStore from "../../../store/appStore";

export default function TextbookButton() {
  const {
    setCurrentTextbook,
    config: { textbooks, currentTextbook },
  } = useAppStore();
  return (
    <div className="dropdown dropdown-hover dropdown-left mx-1 flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
      <span className="label-text">{currentTextbook.name}</span>
      <ul
        tabIndex={0}
        className="dropdown-content z-[20] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {textbooks.map((ele) => (
          <li
            key={ele.name}
            onClick={() => {
              setCurrentTextbook(ele);
            }}
          >
            <a>{ele.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
