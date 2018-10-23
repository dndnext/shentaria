import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Link from "next/link";
import React from "react";
import parseContent from "../../lib/parseContent";
import { EncyclopediaEntry } from "../../types";

export default ({ _id, name, content }: EncyclopediaEntry) => (
  <Link href={`/encyclopedia/entry/${_id}`}>
    <Card>
      <CardHeader title={name} subheader={parseContent(content)} />
    </Card>
  </Link>
);
