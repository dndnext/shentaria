import { withRouter } from "next/router";
import React from "react";
import NewCampaign from "../../app/components/pages/campaign/New";

export default withRouter(({ router }) => <NewCampaign router={router} />);
