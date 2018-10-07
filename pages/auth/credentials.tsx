// @ts-ignore
import { NextAuth } from "next-auth/client";
// @ts-ignore
import Link from "next/link";
import Router from "next/router";
import React from "react";

export default class extends React.Component<
  { session: any },
  { email: string; password: string; session: any }
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
      password: "",
      session: this.props.session,
    };
  }

  public async componentDidMount() {
    if (this.props.session.user) {
      Router.push(`/auth/`);
    }
  }

  public handleEmailChange = ({ target }: { target: any }) => {
    this.setState({
      email: target.value,
    });
  };

  public handlePasswordChange = ({ target }: { target: any }) => {
    this.setState({
      password: target.value,
    });
  };

  public handleSignInSubmit = (event: any) => {
    event.preventDefault();

    NextAuth.signin({
      email: this.state.email,
      password: this.state.password,
    })
      .then((authenticated: any) => {
        console.info("authenticated", authenticated);
        Router.push(`/auth/callback`);
      })
      .catch(() => {
        alert("Authentication failed.");
      });
  };

  public render() {
    if (this.props.session.user) {
      return null;
    } else {
      return (
        <div>
          <div>
            <h1>NextAuth With Credentials</h1>
          </div>
          <div>
            <div>
              <p>
                If you need password based sign in, two factor authentication or
                another sign in method, you can use a signin() function in{" "}
                <strong>next-auth.functions.js</strong>.
              </p>
              <p>
                You can pass in any properties you need – e.g. username and
                password, a PIN or 2FA Token – as properties of the object
                passed to NextAuth.signin() in the front end and they will be
                passed through to your signin() function.
              </p>
              <div>
                <h4>Sign In</h4>
                <div>
                  <p>
                    <strong>Important!</strong> Enable the signin() function in{" "}
                    <strong>next-auth.functions.js</strong> first.
                  </p>
                  <form
                    id="signin"
                    method="post"
                    action="/auth/signin"
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
                    <p>
                      <label htmlFor="password">Password</label>
                      <br />
                      <input
                        name="password"
                        type="password"
                        placeholder=""
                        id="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                      />
                    </p>
                    <p>
                      <button id="submitButton" type="submit">
                        Sign in
                      </button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <p>
            <Link href="/auth">
              <a>Back</a>
            </Link>
          </p>
        </div>
      );
    }
  }
}
