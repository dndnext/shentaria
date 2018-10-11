import React from "react";

export default class SignInButtons extends React.Component<{ providers: any }> {
  public render() {
    return (
      <React.Fragment>
        {Object.keys(this.props.providers).map((provider, i) => {
          return (
            <p key={i}>
              <a href={this.props.providers[provider].signin}>
                Sign in with {provider}
              </a>
            </p>
          );
        })}
      </React.Fragment>
    );
  }
}
