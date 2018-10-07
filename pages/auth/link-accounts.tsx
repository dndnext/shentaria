import React from "react";
import LinkAccount from "./link-account";

export default class LinkAccounts extends React.Component<{
  linkedAccounts: any;
  session: any;
}> {
  public render() {
    return (
      <div>
        <h4>Link Accounts</h4>
        <div>
          {Object.keys(this.props.linkedAccounts).map((provider, i) => {
            return (
              <LinkAccount
                key={i}
                provider={provider}
                session={this.props.session}
                linked={this.props.linkedAccounts[provider]}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
