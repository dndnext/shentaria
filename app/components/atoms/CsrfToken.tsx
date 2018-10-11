import React from "react";
import { UserConsumer } from "../contexts/user";

export default () => (
  <UserConsumer>
    {({ session }) => (
      <input name="_csrf" type="hidden" value={session.csrfToken} />
    )}
  </UserConsumer>
);
