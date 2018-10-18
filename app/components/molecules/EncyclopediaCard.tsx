import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Link from "next/link";
import React from "react";
import { Encyclopedia } from "../../types";

export default ({ _id, name, description }: Encyclopedia) => (
  <Link href={`/encyclopedia/${_id}`}>
    <Card>
      <CardHeader title={name} subheader={description} />
    </Card>
  </Link>
);
