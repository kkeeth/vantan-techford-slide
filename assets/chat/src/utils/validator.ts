export const MAX_MESSAGE_LENGTH = 140;
export const MAX_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_FILENAME_LENGTH = 100;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

export const ERROR_MESSAGES = {
  EMPTY: '内容を入力してください',
  TOO_LONG: `${MAX_MESSAGE_LENGTH} 文字以内で入力`,
} as const;
export const FILE_ERROR_MESSAGES = {
  INVALID_TYPE: 'JPEG, PNG, GIF ファイルのみアップロード可能です',
  TOO_LARGE: `ファイルサイズが大きすぎます（最大${MAX_SIZE / (1024 * 1024)}MB）`,
  NAME_TOO_LONG: 'ファイル名が長すぎます',
} as const;

export const validateMessage = (str: string): string => {
  if (!str.trim()) {
    return ERROR_MESSAGES.EMPTY;
  }
  if (str.length > MAX_MESSAGE_LENGTH) {
    return ERROR_MESSAGES.TOO_LONG;
  }
  return '';
};

export const validateFile = (file: File): string => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return FILE_ERROR_MESSAGES.INVALID_TYPE;
  }
  if (file.size > MAX_SIZE) {
    return FILE_ERROR_MESSAGES.TOO_LARGE;
  }
  if (file.name.length > MAX_FILENAME_LENGTH) {
    return FILE_ERROR_MESSAGES.NAME_TOO_LONG;
  }
  return '';
};
