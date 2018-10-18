import { RouterProps } from "next/router";
import React from "react";
import MapViewer from "../../organisms/MapViewer";

export default ({ router }: { router: RouterProps }) => (
  <MapViewer router={router} />
);
