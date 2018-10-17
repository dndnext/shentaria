import { withRouter } from "next/router";
import React from "react";
import Encyclopedia from "../../../app/components/pages/encyclopedia/View";
import Outline from "../../../app/components/templates/Outline";

export default withRouter(({ router }) => (
  <Outline>
    <Encyclopedia router={router} />
  </Outline>
));
