export const FILE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILENAME_LENGTH: 100,
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
};

export const validateFile = (file: File): string => {
  if (!FILE_LIMITS.ALLOWED_TYPES.includes(file.type)) {
    return 'JPEG, PNG, GIF ファイルのみアップロード可能です';
  }
  if (file.size > FILE_LIMITS.MAX_SIZE) {
    return 'ファイルサイズが大きすぎます（最大5MB）';
  }
  if (file.name.length > FILE_LIMITS.MAX_FILENAME_LENGTH) {
    return 'ファイル名が長すぎます';
  }

  return '';
};
