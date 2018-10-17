interface ModelBase {
  _id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign extends ModelBase {
  name: string;
  description: string;
  coverImage: string;
  gms: string[];
  players: string[];
}

export interface Encyclopedia extends ModelBase {
  name: string;
  description: string;
  coverImage: string;
}

export interface EncyclopediaEntry extends ModelBase {
  name: string;
  encyclopedia: string;
  coverImage: string;
  content: string;
  categories: string[];
  tags: string[];
}

export interface Map extends ModelBase {
  name: string;
  icon: string;
  description: string;
  markers: Marker[];
  layers: number[];
  defaultZoom: number;
  defaultPosition: number[];
}

export interface Marker {
  text: string;
  icon: string;
  position: number[];
  visibleLayers: Array<"*" | number>;
  existingLayers: Array<"*" | number>;
  type: string;
}

export interface PromiseState<T> {
  pending: boolean;
  refreshing: boolean;
  fulfilled: boolean;
  rejected: boolean;
  settled: boolean;
  value: T;
  reason: Error | null;
  meta: any;
}
