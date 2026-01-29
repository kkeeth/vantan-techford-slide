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
  primaryDark: string;
  error: string;
  background: string;
  paper: string;
  border: string;
  borderLight: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
};
