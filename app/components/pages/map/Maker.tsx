import { RouterProps } from "next/router";
import React from "react";
import MapMaker from "../../organisms/MapMaker";

export default ({ router }: { router: RouterProps }) => (
  <MapMaker router={router} />
);
