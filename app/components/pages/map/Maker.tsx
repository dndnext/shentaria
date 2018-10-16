import { RouterProps } from "next/router";
import React from "react";
import MapMaker from "../../organisms/MapMaker";
import Outline from "../../templates/Outline";

export default ({ router }: { router: RouterProps }) => (
  <Outline>
    <MapMaker router={router} />
  </Outline>
);
