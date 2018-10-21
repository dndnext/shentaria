import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import { Marker } from "../../types";
import MapTilePreview from "./MapTilePreview";

interface Props {
  name?: string;
  existing?: any;
  saveMarkers: (data: Array<Partial<Marker>>) => void;
}

interface State {
  file?: File;
  tempMarker?: Partial<Marker>;
  markers: Array<Partial<Marker>>;
  z: number;
}

class MapMaker extends React.Component<Props, State> {
  public state: State = {
    file: undefined,
    markers:
      (this.props.existing &&
        this.props.existing.map &&
        this.props.existing.map.markers) ||
      [],
    z: 1,
  };

  public render() {
    const { name = "Test", existing } = this.props;
    const { file, tempMarker, markers, z } = this.state;
    const existingLayer =
      existing &&
      existing.tiles &&
      existing.tiles.layers &&
      existing.tiles.layers[z];
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
        {tempMarker && tempMarker.position ? (
          <div
            style={{
              left: tempMarker.position[0],
              position: "absolute",
              top: tempMarker.position[1] + 150,
            }}
          >
            <form onSubmit={this.handleSubmitMarker(tempMarker.position)}>
              <input
                autoFocus
                name="text"
                defaultValue={tempMarker.text}
                type="text"
              />
              <button
                type="submit"
                onClick={this.handleSubmitMarker(tempMarker.position)}
              >
                Add Marker
              </button>
            </form>
          </div>
        ) : null}
        {markers &&
          markers
            .filter(({ visibleLayers = [] }) => visibleLayers.includes(z))
            .map(
              marker =>
                marker.position ? (
                  <div
                    key={JSON.stringify(marker.position)}
                    style={{
                      left: marker.position[0],
                      position: "absolute",
                      top: marker.position[1] + 150,
                    }}
                    onClick={this.handleEditMarker(marker)}
                  >
                    {marker.text}
                  </div>
                ) : null,
            )}
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

  private handleClick = (x: number, y: number) => {
    this.setState({ tempMarker: { position: [x, y] } });
  };

  private handleEditMarker = (marker: Partial<Marker>) => () => {
    const { z } = this.state;
    const p = marker.position!;
    const newLayerMarkers = this.state.markers.filter(
      ({ position = [], visibleLayers = [] }) =>
        (visibleLayers.includes(z) && position[0] !== p[0]) ||
        position[1] !== p[1],
    );
    this.setState({ tempMarker: marker, markers: newLayerMarkers });
  };

  private handleSubmitMarker = ([x, y]: number[]) => (
    e: MouseEvent<HTMLButtonElement> | FormEvent,
  ) => {
    e.preventDefault();
    const inputs = [
      ...(e.target as any).parentElement.querySelectorAll("input"),
    ];
    const content = inputs.reduce((v: any, el: HTMLInputElement) => {
      return Object.assign({}, v, { [el.name]: el.value }); //tslint:disable-line
    }, {});
    const { markers, z } = this.state;
    const newMarker = {
      position: [x, y],
      text: content.text,
      visibleLayers: [z],
    };
    const newMarkers = [...markers, newMarker];
    this.props.saveMarkers(newMarkers as any);
    this.setState({ markers: newMarkers, tempMarker: undefined });
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
