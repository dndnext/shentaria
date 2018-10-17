import { withRouter } from "next/router";
import React from "react";
import Encyclopedia from "../../../app/components/pages/encyclopedia/View";

export default withRouter(({ router }) => <Encyclopedia router={router} />);
