import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Icon, Map, PromiseState } from "../../../types";
import MapMaker from "../../organisms/MapMaker";

interface Props {
  icons: PromiseState<Icon[]>;
  router: RouterProps;
  map: PromiseState<{ map: Map; tiles: any }>;
}

const Maker = ({ icons, router, map }: Props) => {
  if (icons.pending || map.pending) {
    return <div>Loading</div>;
  } else if (map.fulfilled && icons.fulfilled) {
    return (
      <div>
        <h4>
          {map.value.map.name} <small>{map.value.map.description}</small>
        </h4>
        <div>{Object.keys(map.value.tiles.layers).length} layers</div>
        <div>{icons.value.length} icons</div>
        <MapMaker
          existing={map.value.tiles}
          name={router.query && (router.query.id as string)}
        />
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};

export default connect((props: Props) => ({
  icons: "/api/icon",
  map: `/api/map/${props.router &&
    props.router.query &&
    props.router.query.id}/full`,
}))(Maker);
