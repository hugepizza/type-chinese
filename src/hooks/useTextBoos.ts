import { useEffect, useState } from "react";
import { Letter, Word } from "../components/typing/TypingContent";
import _ from "lodash";

import data from "../assets/hsk/1.json";
import { pinyin } from "pinyin-pro";
export default function useTextBook({ shuffle }: { shuffle: boolean }) {
  const [content, setContent] = useState<Word[]>([]);
  useEffect(() => {
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
  }, [shuffle]);
  return content;
}
