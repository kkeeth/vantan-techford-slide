const MAX_MESSAGE_LENGTH = 140;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILENAME_LENGTH = 100;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

export const validateMessage = (str: string): string => {
  if (!str.trim()) {
    return '内容を入力してください';
  }
  if (str.length > MAX_MESSAGE_LENGTH) {
    return `${MAX_MESSAGE_LENGTH} 文字以内で入力してください`;
  }
  return '';
};

export const validateFile = (file: File): string => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'JPEG, PNG, GIF ファイルのみアップロード可能です';
  }
  if (file.size > MAX_SIZE) {
    return 'ファイルサイズが大きすぎます（最大5MB）';
  }
  if (file.name.length > MAX_FILENAME_LENGTH) {
    return 'ファイル名が長すぎます';
  }
  return '';
};
