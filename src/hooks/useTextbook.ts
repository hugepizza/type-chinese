import { useEffect, useState } from "react";
import { Letter, Word } from "../components/typing/TypingContent";
import _ from "lodash";

import { pinyin } from "pinyin-pro";
import useAppStore from "../store/appStore";
export default function useTextbook() {
  const shuffle = true;
  const {
    config: {
      currentTextbook: { path, name },
    },
  } = useAppStore();
  const [content, setContent] = useState<Word[]>([]);
  useEffect(() => {
    fetch(path, { method: "GET" })
      .then((resp) => resp.json())
      .then((resp) => resp as { data: { cn: string; en: string }[] })
      .then((data) => {
        const segs = data.data.map((word) => ({ cn: word.cn, en: word.en }));
        const words: Word[] = segs.map((seg) => {
          const keys = pinyin(seg.cn, { toneType: "none" }).split("");
          const holder = pinyin(seg.cn).split("");
          const letters: Letter[] = keys.map((ele, index) => ({
            key: ele,
            holder: holder[index],
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
