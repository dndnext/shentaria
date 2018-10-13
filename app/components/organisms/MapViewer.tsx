import Head from "next/head";
import React from "react";
import NoSSR from "react-no-ssr";

declare module "react" {
  interface StyleHTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

export default class extends React.Component {
  public state = {
    render: false,
  };

  public componentDidMount() {
    this.setState({ render: true });
  }

  public render() {
    const { render } = this.state;
    let Map, TileLayer;
    if (render) {
      const { Map: map, TileLayer: tilelayer } = require("react-leaflet");
      Map = map;
      TileLayer = tilelayer;
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
            style={{ height: "100vh" }}
            minZoom={1}
            maxZoom={5}
          >
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="/static/tiles/test/{z}/{x}/{y}.png"
            />
          </Map>
        </NoSSR>
      </div>
    ) : (
      <span>Map Placeholder</span>
    );
  }
}
