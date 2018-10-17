import { withRouter } from "next/router";
import React from "react";
import NewCampaign from "../../app/components/pages/campaign/New";
import Outline from "../../app/components/templates/Outline";

export default withRouter(({ router }) => (
  <Outline>
    <NewCampaign router={router} />
  </Outline>
));
