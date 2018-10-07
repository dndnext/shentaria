// @ts-ignore
import { NextAuth } from "next-auth/client";
// @ts-ignore
import Router from "next/router";
import React from "react";
import SignInMessage from "./auth/signin-message";

export default class extends React.Component<{ session: any }> {
  public static async getInitialProps({ req }: { req: any }) {
    return {
      session: await NextAuth.init({ req }),
    };
  }

  constructor(props: any) {
    super(props);
  }

  public handleSignOutSubmit = (event: Event) => {
    event.preventDefault();
    NextAuth.signout()
      .then(() => {
        Router.push("/auth/callback");
      })
      .catch((err: Error) => {
        console.error("Signout error", err);
        Router.push("/auth/error?action=signout");
      });
  };

  public render() {
    return (
      <SignInMessage
        handleSignOutSubmit={this.handleSignOutSubmit}
        session={this.props.session}
      />
    );
  }
}
