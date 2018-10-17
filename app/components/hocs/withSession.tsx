import React from "react";
import { UserConsumer } from "../contexts/user";

export default (Component: React.ComponentType) => (props: any) => (
  <UserConsumer>
    {({ session }) => <Component session={session} {...props} />}
  </UserConsumer>
);
