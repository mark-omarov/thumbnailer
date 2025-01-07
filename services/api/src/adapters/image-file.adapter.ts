import path from 'node:path';

import type {
  AllowedExtensions,
  MaxFileSize,
  ValidateExtension,
} from '../ports/image-file.port.js';
import { env } from '../env.js';

export const allowedExtensions: AllowedExtensions = ['.jpg', '.jpeg', '.png'];
export const maxFileSize: MaxFileSize = env.MAX_FILE_SIZE;
export const validateExtension: ValidateExtension = (
  fileName: string
): boolean => {
  const ext = path.extname(fileName);
  return allowedExtensions.includes(ext as AllowedExtensions[number]);
};
