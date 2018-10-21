import Head from "next/head";
import { RouterProps } from "next/router";
import React from "react";
import NoSSR from "react-no-ssr";
import { Map as MapType, Marker as MarkerType } from "../../types";

declare module "react" {
  interface StyleHTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

// const tempmarkers = [
//   {
//     icon: "default",
//     position: [37, 17.09],
//     text: "Orsham. Totally not Horsham.",
//     visible: [2, 3, 4],
//   },
//   {
//     icon: "default",
//     position: [45, 100.09],
//     text: "Musta. Is it far?",
//     visible: [2, 3, 4],
//   },
//   { icon: "default", position: [5, 50.09], text: "Pearkl", visible: [3, 4] },
// ];

interface Props {
  router: RouterProps;
  map: MapType;
}

interface State {
  markers: MarkerType[];
  render: boolean;
  z: number;
}

interface ViewportChange {
  center: number[];
  zoom: number;
}

export default class extends React.Component<Props, State> {
  public state = {
    markers: [],
    render: false,
    z: 1,
  };

  private L?: any;
  private rL?: any;
  private icons?: any = {};

  public componentDidMount() {
    this.setState({ render: true });
    this.L = require("leaflet");
    this.rL = require("react-leaflet");
    this.icons.default = this.L.icon({
      iconAnchor: [0, 0],
      iconSize: [10, 10],
      iconUrl: "/static/markers/default.png",
      popupAnchor: [5, 2],
    });
  }

  public render() {
    const name =
      this.props.router && this.props.router.query
        ? (this.props.router.query.id as string)
        : "Test";
    const { render } = this.state;
    let Map, TileLayer, Marker: any, Popup: any;
    if (render) {
      const {
        Map: map,
        TileLayer: tilelayer,
        Marker: marker,
        Popup: popup,
      } = this.rL;
      Map = map;
      TileLayer = tilelayer;
      Marker = marker;
      Popup = popup;
      // if (this.props.map && this.props.map.markers && this.L) {
      //   console.info(this.L.CRS);
      //   const t = this.L.CRS.pointToLatLng(this.props.map.markers[0].position, this.state.z);
      //   console.info(t);
      // }
    }

    return render ? (
      <div>
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
            integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
            crossOrigin=""
          />
        </Head>
        <style jsx global>{`
          body {
            padding: 0;
            margin: 0;
          }
        `}</style>
        <NoSSR>
          <Map
            center={[51.505, -0.09]}
            zoom={1}
            style={{ height: "95vh" }}
            minZoom={1}
            maxZoom={5}
            onViewportChanged={this.onChange}
            whenReady={this.onReady}
          >
            <TileLayer url={`/static/tiles/${name}/{z}/{x}/{y}.png`} noWrap />
            {this.state.markers &&
              this.state.markers.map(
                ({ icon = "default", position, text }: MarkerType, i) => (
                  <Marker key={i} position={position} icon={this.icons[icon]}>
                    <Popup>{text}</Popup>
                  </Marker>
                ),
              )}
          </Map>
        </NoSSR>
      </div>
    ) : (
      <span>Map Placeholder</span>
    );
  }

  private onReady = (a: any) => {
    const markers = this.props.map.markers.map(marker => {
      const point = new this.L.Point(...marker.position);
      console.info(point);
      const ll = a.target.options.crs.pointToLatLng(point, this.state.z);
      return { ...marker, position: [ll.lat, ll.lng] };
    });
    this.setState({ markers });
  };

  private onChange = ({ zoom: z }: ViewportChange) => {
    this.setState({ z });
  };
}
