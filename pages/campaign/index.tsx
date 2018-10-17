import { withRouter } from "next/router";
import React from "react";
import ListCampaign from "../../app/components/pages/campaign/List";
import Outline from "../../app/components/templates/Outline";

export default withRouter(({ router }) => (
  <Outline>
    <ListCampaign router={router} />
  </Outline>
));
