import Link from "next/link";
import React from "react";

export default class extends React.Component<
  { type: string; action: string },
  {}
> {
  public static async getInitialProps({ query }: { query: any }) {
    return {
      action: query.action || null,
      service: query.service || null,
      type: query.type || null,
    };
  }

  public render() {
    if (this.props.action === "signin" && this.props.type === "oauth") {
      return (
        <div>
          <div>
            <h1>Unable to sign in</h1>
            <p>An account associated with your email address already exists.</p>
            <p>
              <Link href="/auth">
                <a>Sign in with email or another service</a>
              </Link>
            </p>
          </div>
          <div>
            <div>
              <div>
                <h4>Why am I seeing this?</h4>
                <p>
                  It looks like you might have already signed up using another
                  service to sign in.
                </p>
                <p>
                  If you have previously signed up using another service you
                  must link accounts before you can use a different service to
                  sign in.
                </p>
                <p>
                  This is to prevent people from signing up to another service
                  using your email address to try and access your account.
                </p>
                <h4>How do I fix this?</h4>
                <p>
                  First sign in using your email address then link your account
                  to the service you want to use to sign in with in future. You
                  only need to do this once.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      this.props.action === "signin" &&
      this.props.type === "token-invalid"
    ) {
      return (
        <div>
          <div>
            <h1>Link not valid</h1>
            <p>This sign in link is no longer valid.</p>
            <p>
              <Link href="/auth">
                <a>Get a new sign in link</a>
              </Link>
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <h1>Error signing in</h1>
            <p>An error occured while trying to sign in.</p>
            <p>
              <Link href="/auth">
                <a>Sign in with email or another service</a>
              </Link>
            </p>
          </div>
        </div>
      );
    }
  }
}
