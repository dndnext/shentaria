import React, { ChangeEvent } from "react";
import MapTilePreview from "./MapTilePreview";

interface State {
  file?: File;
  z?: number;
}

class MapMaker extends React.Component<{}, State> {
  public state = {
    file: undefined,
    z: 1,
  };

  public render() {
    const { file, z } = this.state;
    return (
      <React.Fragment>
        <input type="file" onChange={this.handleFileChange} />
        <input
          type="range"
          name="z"
          min={1}
          max={4}
          onChange={this.handleChange}
          value={z}
        />
        <MapTilePreview download file={file} name="Test" upload z={z} />
      </React.Fragment>
    );
  }

  private handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [target.name]: target.value });
  };

  private handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files ? target.files[0] : undefined;
    this.setState({ file });
  };
}

export default MapMaker;
