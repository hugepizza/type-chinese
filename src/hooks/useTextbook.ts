import { useEffect, useState } from "react";
import _ from "lodash";

import { pinyin } from "pinyin-pro";
import useAppStore from "../store/appStore";
import { Letter, Word } from "../pages/typing/TypingContent";
import { useShallow } from "zustand/react/shallow";
export default function useTextbook() {
  console.log("recall useTextbook");

  const shuffle = true;
  const {
    currentTextbook: { path, name },
  } = useAppStore(
    useShallow((state) => ({ currentTextbook: state.currentTextbook }))
  );
  const [content, setContent] = useState<Word[]>([]);
  useEffect(() => {
    fetch(path, { method: "GET" })
      .then((resp) => resp.json())
      .then((resp) => resp as { data: { cn: string; en: string }[] })
      .then((data) => {
        const segs = data.data.map((word) => ({ cn: word.cn, en: word.en }));
        const words: Word[] = segs.map((seg) => {
          const keys = pinyin(seg.cn, { toneType: "none" }).split("");
          const tone = pinyin(seg.cn).split("");
          const letters: Letter[] = keys.map((ele, index) => ({
            key: ele,
            tone: tone[index],
            holder: tone[index],
          }));
          return {
            pingyin: letters,
            chinese: seg.cn,
            english: seg.en,
          };
        });
        setContent(shuffle ? _.shuffle(words) : words);
      });
  }, [shuffle, path]);
  return { name, content };
}
