import { withRouter } from "next/router";
import React from "react";
import ViewCampaign from "../../app/components/pages/campaign/View";

export default withRouter(({ router }) => <ViewCampaign router={router} />);
