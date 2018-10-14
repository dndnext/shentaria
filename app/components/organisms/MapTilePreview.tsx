import { saveAs } from "file-saver";
import JSZip from "jszip";
// @ts-ignore
import { NextAuth } from "next-auth/client";
// @ts-ignore
import debounce from "p-debounce";
import React from "react";
import { layerMap } from "../../constants";

interface Props {
  download: boolean;
  file: any;
  name: string;
  upload: boolean;
  z: number;
}

interface State {
  progress: number;
}

interface ImageDetails {
  h: number;
  w: number;
  tilesX: number;
  tilesY: number;
  tileDimension: number;
}

interface Tile {
  data: ImageData;
  x: number;
  y: number;
}

interface BlobTile {
  blob: Blob;
  x: number;
  y: number;
  z: number;
}

class MapTilePreview extends React.Component<Props, State> {
  public state = {
    progress: 0,
  };

  private preview?: HTMLCanvasElement;
  private tilePreview?: HTMLCanvasElement;
  private previewCtx?: CanvasRenderingContext2D;
  private tileCtx?: CanvasRenderingContext2D;
  private details?: ImageDetails;
  private reader?: FileReader;
  private img?: HTMLImageElement;

  public componentDidMount() {
    if (this.preview) {
      this.previewCtx = this.preview.getContext("2d")!;
    }
    if (this.tilePreview) {
      this.tileCtx = this.tilePreview.getContext("2d")!;
    }
    this.reader = new FileReader();
    this.img = new Image();
    this.getFileDetails = debounce(this.getFileDetailsRaw, 200);
    this.draw = debounce(this.drawRaw, 200);
  }

  public async componentDidUpdate(newProps: Props) {
    console.info(this.props, newProps);
    if (
      this.props.file &&
      (this.props.file !== newProps.file || this.props.z !== newProps.z)
    ) {
      this.setState({ progress: 0 });
      console.info("read", this.reader);
      const details = await this.getFileDetails();
      this.details = details;
      await this.draw(details);
    }
  }

  public render() {
    const { download, upload, file } = this.props;
    const { progress } = this.state;
    return (
      <React.Fragment>
        {upload ? (
          <button onClick={this.upload} disabled={!file}>
            Upload
          </button>
        ) : null}
        {download ? (
          <button onClick={this.download} disabled={!file}>
            Download
          </button>
        ) : null}
        <span>Progress: {progress}</span>
        <canvas
          ref={ref => (this.preview = ref!)}
          style={{ border: "1px solid red", width: "100%" }}
        />
        <canvas
          ref={ref => (this.tilePreview = ref!)}
          style={{ border: "1px solid red", display: "none" }}
        />
      </React.Fragment>
    );
  }

  private getFileDetails: () => Promise<ImageDetails> = () =>
    Promise.resolve({
      data: new Uint8ClampedArray(),
      h: 0,
      tileDimension: 1,
      tilesX: 1,
      tilesY: 1,
      w: 0,
    });

  private draw: (details: ImageDetails) => void = () => ({});

  private drawRaw = async (details: ImageDetails) =>
    new Promise(resolve => {
      const previewCtx = this.previewCtx!;
      this.sizeCanvases(details);
      previewCtx.clearRect(0, 0, details.w, details.h);
      this.drawTiles(details);
      this.drawGrid(details);
      resolve();
    });

  private sizeCanvases(details: ImageDetails) {
    const previewCtx = this.previewCtx!;
    const tileCtx = this.tileCtx!;
    previewCtx.canvas.height = details.h;
    previewCtx.canvas.width = details.w;
    tileCtx.canvas.height = details.tileDimension;
    tileCtx.canvas.width = details.tileDimension;
  }

  private drawTiles(details: ImageDetails) {
    const altTiles = this.altGenerateTiles(details);
    const ctx = this.previewCtx!;
    altTiles.forEach(d => ctx.putImageData(d.data, d.x, d.y));
  }

  private altGenerateTiles(details: ImageDetails) {
    const tileCtx = this.tileCtx!;
    const { tilesX, tilesY, tileDimension } = details;
    const xCoords = Array.from({ length: tilesX }, (_, i) => i * tileDimension);
    const yCoords = Array.from({ length: tilesY }, (_, i) => i * tileDimension);
    const tiles: Tile[] = [];
    xCoords.forEach(x => {
      yCoords.forEach(y => {
        tileCtx.clearRect(0, 0, tileCtx.canvas.width, tileCtx.canvas.height);
        tileCtx.drawImage(
          this.img!,
          x,
          y,
          tileDimension,
          tileDimension,
          0,
          0,
          tileDimension,
          tileDimension,
        );
        tiles.push({
          data: tileCtx.getImageData(0, 0, tileDimension, tileDimension),
          x,
          y,
        });
      });
    });
    return tiles;
  }

  private drawGrid(details: ImageDetails) {
    const previewCtx = this.previewCtx!;
    const { tilesX, tilesY, tileDimension } = details;
    const { height, width } = previewCtx.canvas;
    Array.from({ length: tilesX }, (_, i) => i * tileDimension).forEach(x => {
      this.drawLine(x, 0, x, height);
    });
    Array.from({ length: tilesY }, (_, i) => i * tileDimension).forEach(y => {
      this.drawLine(0, y, width, y);
    });
  }

  private drawLine(xs: number, ys: number, xe: number, ye: number) {
    const previewCtx = this.previewCtx!;
    previewCtx.beginPath();
    previewCtx.moveTo(xs, ys);
    previewCtx.lineTo(xe, ye);
    previewCtx.stroke();
  }

  private getFileDetailsRaw = (): Promise<ImageDetails> =>
    new Promise(resolve => {
      const { file, z } = this.props;
      const reader = this.reader!;
      const img = this.img!;
      reader.readAsDataURL(file);
      reader.onload = () => {
        img.src = reader.result as string;
        img.onload = () => {
          const tileDimension =
            Math.max(img.height, img.width) / Math.sqrt(layerMap[z] as number);
          const details: ImageDetails = {
            h: img.height,
            tileDimension,
            tilesX: Math.floor(img.width / tileDimension),
            tilesY: Math.floor(img.height / tileDimension),
            w: img.width,
          };
          resolve(details);
        };
      };
    });

  private getTileBlobs = async () => {
    const { z } = this.props;
    const tileCtx = this.tileCtx!;
    const { tilesX, tilesY, tileDimension } = this.details!;
    const xCoords = Array.from({ length: tilesX }, (_, i) => i * tileDimension);
    const yCoords = Array.from({ length: tilesY }, (_, i) => i * tileDimension);
    const tempTiles: Array<{ x: number; y: number }> = [];
    xCoords.forEach(x => {
      yCoords.forEach(y => {
        tempTiles.push({ x, y });
      });
    });
    const tiles: BlobTile[] = await Promise.all(
      tempTiles.map(({ x, y }) => {
        tileCtx.clearRect(0, 0, tileCtx.canvas.width, tileCtx.canvas.height);
        tileCtx.drawImage(
          this.img!,
          x,
          y,
          tileDimension,
          tileDimension,
          0,
          0,
          tileDimension,
          tileDimension,
        );
        const getBlob: Promise<BlobTile> = new Promise(resolve => {
          const niceX = x / tileDimension;
          const niceY = y / tileDimension;
          tileCtx.canvas.toBlob(blob =>
            resolve({ blob: blob!, x: niceX, y: niceY, z }),
          );
        });
        return getBlob;
      }),
    );
    return tiles;
  };

  private download = async () => {
    const blobs = await this.getTileBlobs();
    const zip = new JSZip();
    blobs.forEach(({ x, y, z, blob }) =>
      zip.file(`tile-${z}-${x}-${y}.png`, blob),
    );
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "tiles.zip");
  };

  private upload = async () => {
    const { name, z } = this.props;
    const blobs = await this.getTileBlobs();
    const token = await NextAuth.csrfToken();
    const uploads = await Promise.all(
      blobs.map(async ({ x, y, blob }) => {
        const form = new FormData();
        form.append("tile", blob, `tile-${x}-${y}.png`);
        return fetch(`/api/upload/${name}/${z}/${x}/${y}`, {
          body: form,
          credentials: "same-origin",
          headers: new Headers({
            "x-csrf-token": token,
          }),
          method: "POST",
        }).then(res => {
          this.setState(({ progress }) => ({ progress: progress + 1 }));
          return res.json();
        });
      }),
    );
    console.info(uploads);
  };
}

export default MapTilePreview;
