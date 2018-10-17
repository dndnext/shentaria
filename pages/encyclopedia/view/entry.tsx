import { withRouter } from "next/router";
import React from "react";
import Entry from "../../../app/components/pages/encyclopedia/ViewEntry";
import Outline from "../../../app/components/templates/Outline";

export default withRouter(({ router }) => (
  <Outline>
    <Entry router={router} />
  </Outline>
));
