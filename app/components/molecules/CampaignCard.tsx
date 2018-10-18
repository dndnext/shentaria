import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Link from "next/link";
import React from "react";
import { Campaign } from "../../types";

export default ({ _id, name, description }: Campaign) => (
  <Link href={`/campaign/${_id}`}>
    <Card>
      <CardHeader title={name} subheader={description} />
    </Card>
  </Link>
);
