import { withRouter } from "next/router";
import React from "react";
import ListCampaign from "../../app/components/pages/campaign/List";

export default withRouter(({ router }) => <ListCampaign router={router} />);
