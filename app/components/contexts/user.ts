import React from "react";

export const UserContext = React.createContext({
  linkedAccounts: [],
  providers: [],
  session: {},
  signout: () => Promise.resolve(),
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
