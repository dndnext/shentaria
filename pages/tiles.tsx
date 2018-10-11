// import { saveAs } from "file-saver";
import JSZip from "jszip";
// @ts-ignore
import { NextAuth } from "next-auth/client";
// @ts-ignore
import React, { ChangeEvent } from "react";
import Authed from "../app/components/atoms/Authed";
import NotAuthed from "../app/components/atoms/NotAuthed";
import StateContainer from "../app/components/templates/StateContainer";

interface ImageDetails {
  h: number;
  w: number;
  tilesX: number;
  tilesY: number;
  data: Uint8ClampedArray;
  tileDimension?: number;
}

interface Tile {
  data: ImageData;
  x: number;
  y: number;
}

const layerMap = [4, 4, 16, 64, 256];

interface Props {
  session: any;
  linkedAccounts: any;
  providers: any;
}

interface State {
  render: boolean;
  tileDimension: number;
  z: number;
}

export default class extends React.Component<Props, State> {
  public static async getInitialProps({ req }: { req: any }) {
    return {
      linkedAccounts: await NextAuth.linked({ req }),
      providers: await NextAuth.providers({ req }),
      session: await NextAuth.init({ req }),
    };
  }

  public state = {
    render: false,
    tileDimension: 256,
    z: 1,
  };

  private reader?: FileReader;
  private ctx?: CanvasRenderingContext2D;
  private tileCtx?: CanvasRenderingContext2D;
  private img?: HTMLImageElement;
  private tiles: Tile[] = [];
  private details: ImageDetails = {
    data: new Uint8ClampedArray(),
    h: 0,
    tilesX: 0,
    tilesY: 0,
    w: 0,
  };

  public componentDidMount() {
    this.setState({ render: true });
    const { tileDimension } = this.state;
    this.reader = new FileReader();
    const canvas = document.getElementById("tiles") as HTMLCanvasElement;
    canvas.width = 500;
    canvas.height = 500;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const tileCanvas = document.getElementById("tile") as HTMLCanvasElement;
    tileCanvas.width = tileDimension;
    tileCanvas.height = tileDimension;
    this.tileCtx = tileCanvas.getContext("2d") as CanvasRenderingContext2D;
    this.img = new Image();
  }

  public render() {
    const { z, tileDimension } = this.state;
    return (
      <StateContainer
        session={this.props.session}
        linkedAccounts={this.props.linkedAccounts}
      >
        <React.Fragment>
          <Authed>
            {() => (
              <div>
                <input type="file" onChange={this.handleFile} />
                <button onClick={this.download}>Download</button>
                <button onClick={this.upload}>Upload</button>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={z}
                  onChange={this.handleState("z")}
                />
                <input
                  disabled
                  type="range"
                  min={10}
                  max={512}
                  value={tileDimension}
                  onChange={this.handleState("tileDimension")}
                />
                <input
                  type="number"
                  min={10}
                  max={512}
                  value={tileDimension}
                  onChange={this.handleState("tileDimension")}
                />
                <canvas id="tiles" />
                <canvas id="tile" style={{ display: "none" }} />
              </div>
            )}
          </Authed>
          <NotAuthed>
            {() => <div>Please login before creating tiles</div>}
          </NotAuthed>
        </React.Fragment>
      </StateContainer>
    );
  }

  private handleState = (field: string) => {
    return (e: ChangeEvent) => {
      this.setState({ [field]: (e.target as any).value } as any);
    };
  };

  private handleFile = (e: ChangeEvent) => {
    if (!(e.target as any).files) {
      return;
    }
    const { z } = this.state;
    const reader = this.reader!;
    const img = this.img!;
    const ctx = this.ctx!;
    const tileCtx = this.tileCtx!;
    reader.readAsDataURL((e.target as any).files[0]);
    reader.onload = () => {
      img.src = reader.result as string;
      img.onload = () => {
        const details: ImageDetails = {
          data: new Uint8ClampedArray(),
          h: img.height,
          tileDimension:
            Math.min(img.height, img.width) / Math.sqrt(layerMap[z] as number),
          tilesX: Math.sqrt(layerMap[z]),
          tilesY: Math.sqrt(layerMap[z]),
          w: img.width,
        };
        tileCtx.canvas.width = details.tileDimension!;
        tileCtx.canvas.height = details.tileDimension!;
        ctx.canvas.height = details.h;
        ctx.canvas.width = details.w;
        ctx.drawImage(img, 0, 0);
        details.data = ctx.getImageData(0, 0, details.w, details.h).data;
        this.details = details;
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
    return (inputX: number, inputY: number) => {
      const x = inputX * details.tileDimension!;
      const y = inputY * details.tileDimension!;
      const tileData = [];
      for (let i = 0; i < details.tileDimension!; i++) {
        tileData.push(
          ...details.data.slice(
            this.getIndex(details, x, y + i),
            this.getIndex(details, x + details.tileDimension!, y + i),
          ),
        );
      }
      const tile: Tile = {
        data: new ImageData(
          new Uint8ClampedArray(tileData),
          details.tileDimension!,
          details.tileDimension!,
        ),
        x,
        y,
      };
      return tile;
    };
  };

  private drawTiles = (tiles: Tile[]) => {
    const offset = 1.01;
    console.log(tiles); //tslint:disable-line
    const ctx = this.ctx!;
    tiles.forEach(d => ctx.putImageData(d.data, d.x * offset, d.y * offset));
    this.tiles = tiles;
  };

  private download = async () => {
    const tileCtx = this.tileCtx!;
    const images = await Promise.all(
      this.tiles.map(
        d =>
          new Promise(resolve => {
            tileCtx.putImageData(d.data, 0, 0);
            tileCtx.canvas.toBlob(blob => resolve(blob as any));
          }),
      ),
    );
    const zip = new JSZip();
    images.forEach((img, i) => zip.file(`tile-${i}.png`, img as any));
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "tiles.zip");
  };

  private upload = async () => {
    const { z } = this.state;
    const tileCtx = this.tileCtx!;
    const images = await Promise.all(
      this.tiles.map(
        d =>
          new Promise(resolve => {
            tileCtx.putImageData(d.data, 0, 0);
            tileCtx.canvas.toBlob(blob => resolve(blob as any));
          }),
      ),
    );
    const form = new FormData();
    const { tilesX } = this.details;
    const getXY = (i: number) => `${i % tilesX}-${Math.floor(i / tilesX)}`;
    images.forEach((img, i) => {
      console.info("tile", 1, getXY(i));
      form.append("tiles", img as any, `tile-${getXY(i)}.png`);
    });
    const token = await NextAuth.csrfToken();
    fetch(`/api/upload/test/${z}`, {
      body: form,
      credentials: "same-origin",
      headers: new Headers({
        "x-csrf-token": token,
      }),
      method: "POST",
    }).then(res => {
      console.info(res.ok);
    });
  };
}
