import React from "react";
import { Consumer, UserConsumer } from "../contexts/user";

interface Props {
  children: (args: Consumer) => React.ReactChild;
}

const NotAuthed: React.SFC<Props> = ({ children }) => (
  <UserConsumer>
    {args => {
      return args.session.user ? null : children(args);
    }}
  </UserConsumer>
);

export default NotAuthed;
