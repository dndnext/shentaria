import { RouterProps } from "next/router";
import React, { ChangeEvent } from "react";
import MapTilePreview from "./MapTilePreview";

interface Props {
  router: RouterProps;
}

interface State {
  file?: File;
  z?: number;
}

class MapMaker extends React.Component<Props, State> {
  public state = {
    file: undefined,
    z: 1,
  };

  public render() {
    const name =
      this.props.router && this.props.router.query
        ? (this.props.router.query.id as string)
        : "Test";
    const { file, z } = this.state;
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
        <MapTilePreview download file={file} name={name} upload z={z} />
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
