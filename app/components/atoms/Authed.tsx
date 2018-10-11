import React from "react";
import { Consumer, UserConsumer } from "../contexts/user";

interface Props {
  children: (args: Consumer) => React.ReactChild;
}

const Authed: React.SFC<Props> = ({ children }) => (
  <UserConsumer>
    {args => {
      return args.session.user ? children(args) : null;
    }}
  </UserConsumer>
);

export default Authed;
