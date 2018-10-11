// @ts-ignore
import { NextAuth } from "next-auth/client";
// @ts-ignore
import Router from "next/router";
import React from "react";
import { UserProvider } from "../contexts/user";

export default class UserManager extends React.Component<
  {
    session: any;
    linkedAccounts: any[];
    providers: any[];
  },
  {
    linkedAccounts: any[];
    providers: any[];
    signout: () => Promise<void>;
    session: any;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      linkedAccounts: props.linkedAccounts,
      providers: props.providers,
      session: props.session,
      signout: this.signout,
    };
  }

  public render() {
    return (
      <UserProvider value={this.state as any}>
        {this.props.children}
      </UserProvider>
    );
  }

  private signout() {
    return NextAuth.signout()
      .then(() => {
        Router.push("/auth/callback");
      })
      .catch((err: Error) => {
        console.error("Signout error", err);
        Router.push("/auth/error?action=signout");
      });
  }
}
