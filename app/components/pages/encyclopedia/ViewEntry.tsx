import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { EncyclopediaEntry, PromiseState } from "../../../types";

interface Props {
  entry: PromiseState<EncyclopediaEntry>;
  router: RouterProps;
}

const ViewEncyclopediaEntry = ({ entry }: Props) => {
  if (entry.fulfilled) {
    return (
      <div>
        <h4>{entry.value.name}</h4>
        <p>{entry.value.content}</p>
        <a href={`/encyclopedia/${entry.value.encyclopedia}`}>
          Back to Encyclopedia
        </a>
      </div>
    );
  } else if (entry.pending) {
    return <div>Loading</div>;
  } else {
    return <div>Error</div>;
  }
};

export default connect((props: Props) => ({
  entry: `/api/encyclopedia/entry/${props.router &&
    props.router.query &&
    props.router.query.id}`,
}))(ViewEncyclopediaEntry);
