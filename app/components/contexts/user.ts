import React, { FormEvent } from "react";

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

const context: Consumer = {
  linkedAccounts: [],
  providers: [],
  session: {},
  signout: () => Promise.resolve(),
};

export const UserContext = React.createContext(context);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
