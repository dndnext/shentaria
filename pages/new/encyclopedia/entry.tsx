import { withRouter } from "next/router";
import React from "react";
import NewEncyclopedia from "../../../app/components/pages/encyclopedia/NewEntry";
import Outline from "../../../app/components/templates/Outline";

export default withRouter(({ router }) => (
  <Outline>
    <NewEncyclopedia router={router} />
  </Outline>
));
