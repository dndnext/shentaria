import { RouterProps } from "next/router";
import React from "react";
import connect from "../../../lib/connect";
import { Icon, Map, Marker, PromiseState } from "../../../types";
import MapViewer from "../../organisms/MapViewer";

interface Props {
  icons: PromiseState<Icon[]>;
  router: RouterProps;
  map: PromiseState<Map>;
  postMarkers: (data: Array<Partial<Marker>>) => void;
}

const Viewer = ({ icons, map, router }: Props) => {
  if (icons.pending || map.pending) {
    return <div>Loading</div>;
  } else if (map.fulfilled && icons.fulfilled) {
    return <MapViewer router={router} map={map.value} />;
  } else {
    return <div>Error</div>;
  }
};

const getMapId = (router: RouterProps) =>
  router && router.query && (router.query.id as string);

export default connect((props: Props) => ({
  icons: "/api/icon",
  map: `/api/map/${getMapId(props.router)}`,
}))(Viewer);
