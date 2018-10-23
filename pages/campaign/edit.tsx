import { withRouter } from "next/router";
import React from "react";
import EditCampaign from "../../app/components/pages/campaign/Edit";

export default withRouter(({ router }) => <EditCampaign router={router} />);
