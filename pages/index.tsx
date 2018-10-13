// @ts-ignore
import { NextAuth } from "next-auth/client";
// @ts-ignore
import Link from "next/link";
import Router from "next/router";
import React from "react";
import Authed from "../app/components/atoms/Authed";
import CsrfToken from "../app/components/atoms/CsrfToken";
import NotAuthed from "../app/components/atoms/NotAuthed";
import Outline from "../app/components/templates/Outline";
import StateContainer from "../app/components/templates/StateContainer";

export default class extends React.Component<{
  session: any;
  linkedAccounts: any;
  providers: any;
}> {
  public static async getInitialProps({ req }: { req: any }) {
    return {
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req }),
      session: await NextAuth.init({ req }),
    };
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
      <React.Fragment>
        <StateContainer
          session={this.props.session}
          linkedAccounts={this.props.linkedAccounts}
        >
          <Outline>
            <React.Fragment>
              <Authed>
                {({ signout }) => (
                  <React.Fragment>
                    <p>
                      <Link href="/auth">
                        <a>Manage Account</a>
                      </Link>
                    </p>
                    <form
                      id="signout"
                      method="post"
                      action="/auth/signout"
                      onSubmit={signout}
                    >
                      <CsrfToken />
                      <button type="submit">Sign out</button>
                    </form>
                  </React.Fragment>
                )}
              </Authed>
              <NotAuthed>
                {() => (
                  <p>
                    <Link href="/auth">
                      <a>Sign in</a>
                    </Link>
                  </p>
                )}
              </NotAuthed>
            </React.Fragment>
          </Outline>
        </StateContainer>
      </React.Fragment>
    );
  }
}
