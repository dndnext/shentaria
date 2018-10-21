import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Icon, Map, Marker, PromiseState } from "../../../types";
import MapMaker from "../../organisms/MapMaker";

interface Props {
  icons: PromiseState<Icon[]>;
  router: RouterProps;
  map: PromiseState<{ map: Map; tiles: any }>;
  postMarkers: (data: Array<Partial<Marker>>) => void;
}

const Maker = ({ icons, router, map, postMarkers }: Props) => {
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
          existing={map.value}
          name={getMapId(router)}
          saveMarkers={postMarkers}
        />
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};

const getMapId = (router: RouterProps) =>
  router && router.query && (router.query.id as string);

export default connect((props: Props) => ({
  icons: "/api/icon",
  map: `/api/map/${getMapId(props.router)}/full`,
  postMarkers: (data: Array<Partial<Marker>>) => ({
    markers: {
      body: JSON.stringify(data),
      method: "POST",
      url: `/api/map/${getMapId(props.router)}/markers`,
    },
  }),
}))(Maker);
