import React from "react";
import CsrfToken from "../../app/components/atoms/CsrfToken";

export default class LinkAccount extends React.Component<{
  linked: boolean;
  provider: string;
  session: any;
}> {
  public render() {
    if (this.props.linked === true) {
      return (
        <form
          method="post"
          action={`/auth/oauth/${this.props.provider.toLowerCase()}/unlink`}
        >
          <CsrfToken />
          <p>
            <button type="submit">Unlink from {this.props.provider}</button>
          </p>
        </form>
      );
    } else {
      return (
        <p>
          <a href={`/auth/oauth/${this.props.provider.toLowerCase()}`}>
            Link with {this.props.provider}
          </a>
        </p>
      );
    }
  }
}
