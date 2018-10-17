import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { EncyclopediaEntry, PromiseState } from "../../../types";

interface Props {
  entry: PromiseState<EncyclopediaEntry>;
  router: RouterProps;
}

class ViewEncyclopediaEntry extends React.Component<Props> {
  public state = {
    description: "",
    name: "",
  };

  public render() {
    const { entry } = this.props;
    if (entry.fulfilled) {
      const loaded = entry.value;
      return (
        <div>
          <h4>{loaded.name}</h4>
          <p>{loaded.content}</p>
          <a href={`/encyclopedia/${loaded.encyclopedia}`}>
            Back to Encyclopedia
          </a>
        </div>
      );
    } else if (entry.pending) {
      return <div>Loading</div>;
    } else {
      return <div>Error</div>;
    }
  }
}

export default connect((props: Props) => ({
  entry: `/api/encyclopedia/entry/${props.router &&
    props.router.query &&
    props.router.query.id}`,
}))(ViewEncyclopediaEntry);
