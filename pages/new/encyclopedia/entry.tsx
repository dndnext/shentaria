import { withRouter } from "next/router";
import React from "react";
import NewEncyclopedia from "../../../app/components/pages/encyclopedia/NewEntry";

export default withRouter(({ router }) => <NewEncyclopedia router={router} />);
