export type AllowedExtensions = ('.jpg' | '.jpeg' | '.png')[];
export type MaxFileSize = number;
export type ValidateExtension = (fileName: string) => boolean;
