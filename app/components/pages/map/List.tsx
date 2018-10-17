import React from "react";
import connect from "../../../lib/connect";
import { Map, PromiseState } from "../../../types";

interface Props {
  maps: PromiseState<Map[]>;
}

const ListMap = ({ maps }: Props) => {
  if (maps.fulfilled) {
    return (
      <React.Fragment>
        <a href="/new/map">New Map</a>
        {maps.value.map(({ _id, name, description }) => (
          <div key={_id}>
            <a href={`/map/${_id}`}>
              <strong>{name}</strong>
            </a>
            <p>{description}</p>
          </div>
        ))}
      </React.Fragment>
    );
  } else if (maps.pending) {
    return <div>Loading</div>;
  } else {
    return <div>Error</div>;
  }
};

export default connect(() => ({
  maps: "/api/map",
}))(ListMap);
