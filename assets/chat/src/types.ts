// src/types.ts
export interface Message {
  id: number;
  text: string;
  image?: string;
  date: string;
  createdAt?: Date;
}


export interface MessageFormData {
  text: string;
  image: File | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type MessageWithoutId = Omit<Message, 'id'>;