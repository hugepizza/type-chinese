import NotStart from "./NotStart";

export default function Mask({ typingStatus }: { typingStatus: string }) {
  return (
    <div
      className={`absolute flex justify-center items-center text-3xl w-full h-64 ${
        typingStatus != "TYPING" ? "z-10 backdrop-blur-[6px]" : "hidden"
      }`}
    >
      {typingStatus === "NOT_STARTED" && <NotStart />}
      {typingStatus === "PAUSED" && (
        <div className="flex flex-col">
          <span>
            Press<kbd className="kbd kbd-md mx-2">Enter</kbd> to resume
          </span>
          <span>
            Press<kbd className="kbd kbd-md mx-2">Esc</kbd> to end
          </span>
        </div>
      )}
    </div>
  );
}
