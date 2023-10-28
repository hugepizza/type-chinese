import { useEffect, useState, useRef } from "react";
export default function useTimer() {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [lastPausedAt, setLastPausedAt] = useState(startTime);
  const [isPaused, setIsPaused] = useState(true);
  const [pausedDuration, setPausedDuration] = useState<number>(0);
  const [duration, setDuration] = useState(0);
  const isPausedRef = useRef(isPaused);
  const durationRef = useRef(duration);
  const pausedDurationRef = useRef(pausedDuration);
  const startTimeRef = useRef(startTime);
  const lastPausedAtRef = useRef(lastPausedAt);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);
  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);
  useEffect(() => {
    pausedDurationRef.current = pausedDuration;
  }, [pausedDuration]);
  useEffect(() => {
    startTimeRef.current = startTime;
  }, [startTime]);
  useEffect(() => {
    lastPausedAtRef.current = lastPausedAt;
  }, [lastPausedAt]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        const now = new Date();
        const duration = Math.floor(
          now.getTime() - startTimeRef.current!.getTime()
        );
        setDuration(Math.ceil(duration - pausedDurationRef.current));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pause = () => {
    if (isPausedRef.current) {
      return;
    }
    console.log("pause");
    setLastPausedAt(new Date());
    setIsPaused(true);
  };
  const resume = () => {
    if (!isPausedRef.current) {
      return;
    }
    console.log("resume");
    const now = new Date();
    if (startTimeRef.current === null) {
      setStartTime(now);
    } else {
      setPausedDuration(
        (prev) => prev + (now.getTime() - lastPausedAtRef.current!.getTime())
      );
    }

    setIsPaused(false);
  };
  return { isPaused, duration, pause, resume };
}
