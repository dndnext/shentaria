import React, { ChangeEvent } from "react";
import { Marker } from "../../types";
import MapTilePreview from "./MapTilePreview";

interface Props {
  name?: string;
  existing?: any;
}

interface State {
  file?: File;
  markers: { [i: number]: Array<Partial<Marker>> };
  z?: number;
}

class MapMaker extends React.Component<Props, State> {
  public state = {
    file: undefined,
    markers: { 1: [] },
    z: 1,
  };

  public render() {
    const { name = "Test", existing } = this.props;
    const { file, markers = {}, z } = this.state;
    const existingLayer = existing.layers && existing.layers[z];
    const layerMarkers = (markers as any)[z] || [];
    const lastMarker = [{ position: [0, 0] }].concat(layerMarkers).pop() || {
      position: [0, 0],
    };
    const marker = lastMarker.position;
    return (
      <React.Fragment>
        <input type="file" onChange={this.handleFileChange} />
        {name}
        <input
          type="range"
          name="z"
          min={1}
          max={4}
          onChange={this.handleChange}
          value={z}
        />
        <div
          style={{
            left: marker[0],
            position: "absolute",
            top: marker[1] + 150,
          }}
        >
          Marker
        </div>
        <MapTilePreview
          download
          file={file}
          name={name}
          onClick={this.handleClick}
          upload
          z={z}
          existing={existingLayer}
        />
      </React.Fragment>
    );
  }

  private handleClick = (x: number, y: number, t: HTMLCanvasElement) => {
    const { markers, z } = this.state;
    const newMarkers = {
      ...markers,
      [z]: [...((markers as any)[z] || []), { position: [x, y] }],
    };
    this.setState({ markers: newMarkers });
  };

  private handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [target.name]: target.value } as any);
  };

  private handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files ? target.files[0] : undefined;
    this.setState({ file });
  };
}

export default MapMaker;
