export type Color = {
  hex: string;
  name?: string;
};

export type Palette = {
  id: string;
  colors: Color[];
  keyword?: string;
  baseColor?: string;
  createdAt: number;
};
