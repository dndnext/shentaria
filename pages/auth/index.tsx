import { css } from "emotion";
// @ts-ignore
import { NextAuth } from "next-auth/client";
// @ts-ignore
import Link from "next/link";
import Router from "next/router";
import React from "react";
import LinkAccounts from "./link-accounts";
import presetForCss from "./presetForCss";
import SignInButtons from "./signin-buttons";

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
    if (this.props.session.user) {
      return (
        <div className={presetForCss.flexParent}>
          <div>
            <h1 className={example}>NextAuth Example</h1>
            <p>
              You are signed in as <span>{this.props.session.user.email}</span>.
            </p>
          </div>
          <div>
            <div>
              <LinkAccounts
                session={this.props.session}
                linkedAccounts={this.props.linkedAccounts}
              />
            </div>
          </div>
          <p>
            <Link href="/">
              <a>Home</a>
            </Link>
          </p>
        </div>
      );
    } else {
      return (
        <div className={presetForCss.flexParent}>
          <div>
            <h1 className={example}>NextAuth Example</h1>
          </div>
          <div>
            <div>
              <div>
                <h4>Sign In</h4>
                <div>
                  <SignInButtons providers={this.props.providers} />
                  <form
                    id="signin"
                    method="post"
                    action="/auth/email/signin"
                    onSubmit={this.handleSignInSubmit}
                  >
                    <input
                      name="_csrf"
                      type="hidden"
                      value={this.state.session.csrfToken}
                    />
                    <p>
                      <label htmlFor="email">Email address</label>
                      <br />
                      <input
                        name="email"
                        type="text"
                        placeholder="j.smith@example.com"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                      />
                    </p>
                    <p className="text-right">
                      <button id="submitButton" type="submit">
                        Sign in with email
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <p>
            <Link href="/auth/credentials">
              <a>Sign in with credentials</a>
            </Link>
          </p>
          <p>
            <Link href="/">
              <a>Home</a>
            </Link>
          </p>
        </div>
      );
    }
  }
}
