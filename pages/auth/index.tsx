import { css } from "emotion";
// @ts-ignore
import { NextAuth } from "next-auth/client";
// @ts-ignore
import Link from "next/link";
import Router from "next/router";
import React from "react";
import Authed from "../../app/components/atoms/Authed";
import NotAuthed from "../../app/components/atoms/NotAuthed";
import SignInButtons from "../../app/components/atoms/SignInButtons";
import StateContainer from "../../app/components/templates/StateContainer";
import LinkAccounts from "./link-accounts";

export default class extends React.Component<
  { session: any; linkedAccounts: any; providers: any },
  { email: string; session: any }
> {
  public static async getInitialProps({ req }: { req: any }) {
    return {
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req }),
      session: await NextAuth.init({ req }),
    };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      session: this.props.session,
    };
  }

  public handleEmailChange = ({ target }: { target: any }) => {
    this.setState({
      email: target.value,
    });
  };

  public handleSignInSubmit = (event: any) => {
    event.preventDefault();

    if (!this.state.email) {
      return;
    }

    NextAuth.signin(this.state.email)
      .then(() => {
        Router.push(`/auth/check-email?email=${this.state.email}`);
      })
      .catch(() => {
        Router.push(
          `/auth/error?action=signin&type=email&email=${this.state.email}`,
        );
      });
  };

  public render() {
    const example = css({
      color: "red",
    });
    return (
      <StateContainer
        session={this.props.session}
        linkedAccounts={this.props.linkedAccounts}
        providers={this.props.providers}
      >
        <React.Fragment>
          <Authed>
            {({ session, linkedAccounts }) => (
              <div>
                <div>
                  <h1 className={example}>NextAuth Example</h1>
                  <p>
                    You are signed in as <span>{session.user.email}</span>.
                  </p>
                </div>
                <div>
                  <div>
                    <LinkAccounts
                      session={session}
                      linkedAccounts={linkedAccounts}
                    />
                  </div>
                </div>
                <p>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </p>
              </div>
            )}
          </Authed>
          <NotAuthed>
            {({ providers }) => (
              <div>
                <div>
                  <h1 className={example}>NextAuth Example</h1>
                </div>
                <div>
                  <div>
                    <div>
                      <h4>Sign In</h4>
                      <div>
                        <SignInButtons providers={providers} />
                      </div>
                    </div>
                  </div>
                </div>
                <p>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </p>
              </div>
            )}
          </NotAuthed>
        </React.Fragment>
      </StateContainer>
    );
  }
}
