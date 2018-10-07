import React, { ChangeEvent } from "react";

interface ImageDetails {
  h: number;
  w: number;
  tilesX: number;
  tilesY: number;
  data: Uint8ClampedArray;
}

interface Tile {
  data: ImageData;
  x: number;
  y: number;
}

export default class extends React.Component {
  public state = {
    render: false,
    tileDimension: 100,
  };

  private reader?: FileReader;
  private ctx?: CanvasRenderingContext2D;
  private img?: HTMLImageElement;

  public componentDidMount() {
    this.setState({ render: true });
    this.reader = new FileReader();
    const canvas = document.getElementById("tiles") as HTMLCanvasElement;
    canvas.width = 500;
    canvas.height = 500;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.img = new Image();
  }

  public render() {
    return (
      <div>
        <input type="file" onChange={this.handleFile} />
        <canvas id="tiles" />
      </div>
    );
  }

  private handleFile = (e: ChangeEvent) => {
    const { tileDimension } = this.state;
    if (!(e.target as any).files) {
      return;
    }
    const reader = this.reader!;
    const img = this.img!;
    const ctx = this.ctx!;
    reader.readAsDataURL((e.target as any).files[0]);
    reader.onload = () => {
      img.src = reader.result as string;
      img.onload = () => {
        const details: ImageDetails = {
          data: new Uint8ClampedArray(),
          h: img.height,
          tilesX: Math.floor(img.width / tileDimension),
          tilesY: Math.floor(img.height / tileDimension),
          w: img.width,
        };
        ctx.drawImage(img, 0, 0);
        details.data = ctx.getImageData(0, 0, details.w, details.h).data;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const tiles = this.generateTiles(details);
        this.drawTiles(tiles);
      };
    };
  };

  private generateTiles = (details: ImageDetails) => {
    console.log("generating", details); //tslint:disable-line
    const getTile = this.getTileGenerator(details);
    const tiles = [];
    for (let yi = 0; yi < details.tilesY; yi++) {
      for (let xi = 0; xi < details.tilesX; xi++) {
        tiles.push(getTile(xi, yi));
      }
    }
    return tiles;
  };

  private getIndex(details: ImageDetails, x: number, y: number) {
    function indexX(inX: number) {
      const i = inX * 4;
      if (i > details.data.length) {
        console.warn("X out of bounds");
      }
      return i;
    }
    function indexY(inY: number) {
      const i = details.w * 4 * inY;
      if (i > details.data.length) {
        console.warn("Y out of bounds");
      }
      return i;
    }
    const idx = indexX(x) + indexY(y);
    if (idx > details.data.length) {
      console.warn("XY out of bounds");
    }
    return idx;
  }

  private getTileGenerator = (details: ImageDetails) => {
    const { tileDimension } = this.state;
    return (inputX: number, inputY: number) => {
      const x = inputX * tileDimension;
      const y = inputY * tileDimension;
      const tileData = [];
      for (let i = 0; i < tileDimension; i++) {
        tileData.push(
          ...details.data.slice(
            this.getIndex(details, x, y + i),
            this.getIndex(details, x + tileDimension, y + i),
          ),
        );
      }
      const tile: Tile = {
        data: new ImageData(
          new Uint8ClampedArray(tileData),
          tileDimension,
          tileDimension,
        ),
        x,
        y,
      };
      return tile;
    };
  };

  private drawTiles = (tiles: Tile[]) => {
    const offset = 1.1;
    console.log(tiles); //tslint:disable-line
    const ctx = this.ctx!;
    tiles.forEach(d => ctx.putImageData(d.data, d.x * offset, d.y * offset));
  };
}
