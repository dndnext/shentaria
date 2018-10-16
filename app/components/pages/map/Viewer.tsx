import { RouterProps } from "next/router";
import React from "react";
import MapViewer from "../../organisms/MapViewer";
import Outline from "../../templates/Outline";

export default ({ router }: { router: RouterProps }) => (
  <Outline>
    <MapViewer router={router} />
  </Outline>
);
