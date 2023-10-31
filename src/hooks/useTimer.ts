import { useEffect, useState, useRef } from "react";
export default function useTimer() {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [lastPausedAt, setLastPausedAt] = useState(startTime);
  const [status, setStatus] = useState<"NOT_STARTED" | "PAUSED" | "TYPING">(
    "NOT_STARTED"
  );
  const [pausedDuration, setPausedDuration] = useState<number>(0);
  const [duration, setDuration] = useState(0);
  const statusRef = useRef(status);
  const durationRef = useRef(duration);
  const pausedDurationRef = useRef(pausedDuration);
  const startTimeRef = useRef(startTime);
  const lastPausedAtRef = useRef(lastPausedAt);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);
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
      if (statusRef.current === "TYPING") {
        const now = new Date();

        const duration = Math.floor(
          now.getTime() - startTimeRef.current!.getTime()
        );
        setDuration(Math.ceil(duration - pausedDurationRef.current));
      } else if (statusRef.current === "NOT_STARTED") {
        setDuration(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pause = () => {
    if (statusRef.current != "TYPING") {
      return;
    }
    console.log("pause");
    setLastPausedAt(new Date());
    setStatus("PAUSED");
  };
  const resume = () => {
    if (statusRef.current != "PAUSED") {
      return;
    }
    const now = new Date();
    setPausedDuration(
      (prev) => prev + (now.getTime() - lastPausedAtRef.current!.getTime())
    );
    setStatus("TYPING");
  };
  const start = () => {
    if (statusRef.current != "NOT_STARTED") {
      return;
    }
    const now = new Date();
    console.log("start at!!!", now);
    setStartTime(now);
    console.log(now);

    setStatus("TYPING");
  };
  const end = () => {
    if (!["PAUSED", "TYPING"].includes(statusRef.current)) {
      return;
    }
    console.log("end");
    setStartTime(null);
    setStatus("NOT_STARTED");
    setLastPausedAt(null);
    setPausedDuration(0);
  };

  return { typingStatus: status, duration, pause, resume, start, end };
}
