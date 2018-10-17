import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { EncyclopediaEntry } from "../../../types";

interface Props {
  entry: any;
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
      const loaded: EncyclopediaEntry = entry.value;
      return (
        <div>
          <h4>{loaded.name}</h4>
          <p>{loaded.content}</p>
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
