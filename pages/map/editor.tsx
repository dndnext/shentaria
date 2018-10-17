import { withRouter } from "next/router";
import React from "react";
import MapMaker from "../../app/components/pages/map/Maker";

export default withRouter(({ router }) => <MapMaker router={router} />);
