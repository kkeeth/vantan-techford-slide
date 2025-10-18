// src/types.ts
export type Message = {
  id: string;
  text: string;
  image?: string;
  date: string;
  createdAt?: Date;
};

export type MessageWithoutId = Omit<Message, 'id'>;

export type Colors = {
  primary: string;
  secondary: string;
  surface: string;
  gradient: string;
  gradientHover: string;
  background: string;
};
