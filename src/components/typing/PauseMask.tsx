export default function PauseMask() {
  return (
    <div className="flex flex-col justify-center items-center absolute w-screen h-screen left-0 top-0 z-40 bg-black opacity-80">
      <div className="flex justify-center gap-1 my-1 w-full">
        <kbd className="kbd">q</kbd>
        <kbd className="kbd">w</kbd>
        <kbd className="kbd">e</kbd>
        <kbd className="kbd">r</kbd>
        <kbd className="kbd">t</kbd>
        <kbd className="kbd">y</kbd>
        <kbd className="kbd">u</kbd>
        <kbd className="kbd">i</kbd>
        <kbd className="kbd">o</kbd>
        <kbd className="kbd">p</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-full">
        <kbd className="kbd">a</kbd>
        <kbd className="kbd">s</kbd>
        <kbd className="kbd">d</kbd>
        <kbd className="kbd">f</kbd>
        <kbd className="kbd">g</kbd>
        <kbd className="kbd">h</kbd>
        <kbd className="kbd">j</kbd>
        <kbd className="kbd">k</kbd>
        <kbd className="kbd">l</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-full">
        <kbd className="kbd">z</kbd>
        <kbd className="kbd">x</kbd>
        <kbd className="kbd">c</kbd>
        <kbd className="kbd">v</kbd>
        <kbd className="kbd">b</kbd>
        <kbd className="kbd">n</kbd>
        <kbd className="kbd">m</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-full">
        <kbd className="kbd">
          <span className="text-sm">Press Any Key To Start</span>
        </kbd>
      </div>
      <span className="text-2xl">开始练习！</span>
    </div>
  );
}
