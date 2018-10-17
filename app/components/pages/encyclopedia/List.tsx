import React from "react";
import connect from "../../../lib/connect";
import { Encyclopedia } from "../../../types";

interface Props {
  encyclopedias: any;
}

class NewEncyclopedia extends React.Component<Props> {
  public state = {
    description: "",
    name: "",
  };

  public render() {
    const { encyclopedias } = this.props;
    if (encyclopedias.fulfilled) {
      return (
        <React.Fragment>
          <a href="/new/encyclopedia">New Encyclopedia</a>
          {encyclopedias.value.map(
            ({ _id, name, description }: Encyclopedia) => (
              <div key={_id}>
                <a href={`/encyclopedia/${_id}`}>
                  <strong>{name}</strong>
                </a>
                <p>{description}</p>
              </div>
            ),
          )}
        </React.Fragment>
      );
    } else if (encyclopedias.pending) {
      return <div>Loading</div>;
    } else {
      return <div>Error</div>;
    }
  }
}

export default connect(() => ({
  encyclopedias: "/api/encyclopedia",
}))(NewEncyclopedia);
