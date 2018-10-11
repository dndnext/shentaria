import React from "react";
import UserManager from "../managers/User";

const StateContainer: React.SFC<{
  children: React.ReactChild;
  session?: any;
  linkedAccounts?: any;
  providers?: any;
}> = ({ children, session, linkedAccounts, providers }) => (
  <UserManager
    session={session}
    linkedAccounts={linkedAccounts}
    providers={providers}
  >
    {children}
  </UserManager>
);

export default StateContainer;
