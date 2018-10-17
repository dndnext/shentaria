import React from "react";
import connect from "../../../lib/connect";
import { Encyclopedia, PromiseState } from "../../../types";

interface Props {
  encyclopedias: PromiseState<Encyclopedia[]>;
}

const ListEncyclopedia = ({ encyclopedias }: Props) => {
  if (encyclopedias.fulfilled) {
    return (
      <React.Fragment>
        <a href="/new/encyclopedia">New Encyclopedia</a>
        {encyclopedias.value.map(({ _id, name, description }) => (
          <div key={_id}>
            <a href={`/encyclopedia/${_id}`}>
              <strong>{name}</strong>
            </a>
            <p>{description}</p>
          </div>
        ))}
      </React.Fragment>
    );
  } else if (encyclopedias.pending) {
    return <div>Loading</div>;
  } else {
    return <div>Error</div>;
  }
};

export default connect(() => ({
  encyclopedias: "/api/encyclopedia",
}))(ListEncyclopedia);
