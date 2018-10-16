import { withRouter } from "next/router";
import React from "react";
import MapViewer from "../../app/components/pages/map/Viewer";

export default withRouter(({ router }) => <MapViewer router={router} />);
