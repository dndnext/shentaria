import React, { Consumer, FormEvent } from "react";

interface Session {
  user: any;
  csrfToken: any;
}

export interface Consumer {
  linkedAccounts: any[];
  providers: any[];
  session: Partial<Session>;
  signout: (e?: FormEvent) => Promise<void>;
}

export const UserContext = React.createContext({
  linkedAccounts: [],
  providers: [],
  session: {},
  signout: () => Promise.resolve(),
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer as React.Consumer<Consumer>;
