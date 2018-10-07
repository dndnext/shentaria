import Link from "next/link";
import React from "react";

export default class extends React.Component<{ email: string }> {
  public static async getInitialProps({ query }: { query: any }) {
    return {
      email: query.email,
    };
  }

  public render() {
    return (
      <div>
        <h1>Check your email</h1>
        <p>
          A sign in link has been sent to{" "}
          {this.props.email ? (
            <span>{this.props.email}</span>
          ) : (
            <span>your inbox</span>
          )}
          .
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
