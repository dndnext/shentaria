import { withRouter } from "next/router";
import React from "react";
import NewMap from "../../app/components/pages/map/New";
import Outline from "../../app/components/templates/Outline";

export default withRouter(({ router }) => (
  <Outline>
    <NewMap router={router} />
  </Outline>
));
