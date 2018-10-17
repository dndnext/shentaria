import { withRouter } from "next/router";
import React from "react";
import NewMap from "../../app/components/pages/map/New";

export default withRouter(({ router }) => <NewMap router={router} />);
