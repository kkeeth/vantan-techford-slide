// src/types.ts
export type Message = {
  id: string;
  text: string;
  image?: string;
  imageName?: string;
  date: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type Colors = {
  primary: string;
  secondary: string;
  surface: string;
  gradient: string;
  gradientHover: string;
  background: string;
};
