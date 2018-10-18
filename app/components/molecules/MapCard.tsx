import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/MapTwoTone";
import Link from "next/link";
import React from "react";
import { Map } from "../../types";

export default ({ _id, name, description }: Map) => (
  <Link href={`/map/${_id}`}>
    <Card>
      <CardHeader
        title={name}
        subheader={description}
        action={
          <Link href={`/map/${_id}/editor`}>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Link>
        }
      />
    </Card>
  </Link>
);
