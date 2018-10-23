import { withRouter } from "next/router";
import React from "react";
import Entry from "../../../app/components/pages/encyclopedia/EditEntry";

export default withRouter(({ router }) => <Entry router={router} />);
