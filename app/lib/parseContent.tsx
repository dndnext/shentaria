import React from "react";
import { Block, Value } from "slate";
import Html from "slate-html-serializer";

const RULES = [
  {
    serialize(item: Block, children: any) {
      console.info(">", item, children);
      return <p>{children}</p>;
    },
  },
];

const serialiser = new Html({ rules: RULES });

export default function parseContent(content: string) {
  let tmpContent = content;
  try {
    tmpContent = serialiser.serialize(Value.fromJSON(JSON.parse(content)));
  } catch (e) {
    /**/
  }
  return tmpContent;
}
