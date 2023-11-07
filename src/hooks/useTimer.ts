import { useEffect, useState, useRef } from "react";
import useTypingStore from "../store/typingStore";
import { useShallow } from "zustand/react/shallow";
export default function useTimer() {
  const { status, setStatus, setStartTime, startTime, duration, setDuration } =
    useTypingStore(
      useShallow((state) => ({
        status: state.status,
        setStatus: state.setStatus,
        setStartTime: state.setStartTime,
        startTime: state.startTime,
        duration: state.duration,
        setDuration: state.setDuration,
      }))
    );
  const [lastPausedAt, setLastPausedAt] = useState(startTime);

  const [pausedDuration, setPausedDuration] = useState<number>(0);
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
    setStartTime(now);
    setStatus("TYPING");
  };
  const end = () => {
    if (!["PAUSED", "TYPING"].includes(statusRef.current)) {
      return;
    }
    setStartTime(null);
    setStatus("NOT_STARTED");
    setLastPausedAt(null);
    setPausedDuration(0);
  };

  return {
    pause,
    resume,
    start,
    end,
  };
}
