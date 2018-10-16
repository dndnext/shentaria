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
      return encyclopedias.value.map(
        ({ _id, name, description }: Encyclopedia) => (
          <div key={_id}>
            <strong>{name}</strong>
            <p>{description}</p>
          </div>
        ),
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
