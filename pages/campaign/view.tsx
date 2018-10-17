import { withRouter } from "next/router";
import React from "react";
import ViewCampaign from "../../app/components/pages/campaign/View";
import Outline from "../../app/components/templates/Outline";

export default withRouter(({ router }) => (
  <Outline>
    <ViewCampaign router={router} />
  </Outline>
));
