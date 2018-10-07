import { css } from "emotion";
import Link from "next/link";
import React from "react";
import presetForCss from "./presetForCss";

export default class SignInMessage extends React.Component<{
  handleSignOutSubmit: any;
  session: any;
}> {
  public render() {
    if (this.props.session.user) {
      return (
        <React.Fragment>
          <div className={presetForCss.flexParent}>
            <p className={presetForCss.heading1}>
              <Link href="/auth">
                <a>Manage Account</a>
              </Link>
            </p>
            <form
              id="signout"
              method="post"
              action="/auth/signout"
              onSubmit={this.props.handleSignOutSubmit}
            >
              <input
                name="_csrf"
                type="hidden"
                value={this.props.session.csrfToken}
              />
              <button type="submit">Sign out</button>
            </form>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <p>
            <Link href="/auth">
              <a>Sign in</a>
            </Link>
          </p>
        </React.Fragment>
      );
    }
  }
}
