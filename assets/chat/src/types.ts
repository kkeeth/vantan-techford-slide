export type Message = {
  id: string;
  text: string;
  date: string;
  image?: string; // Base64 データを想定
  imageName?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Colors = {
  primary: string;
  surface: string;
  gradient: string;
  gradientHover: string;
  background: string;
};
