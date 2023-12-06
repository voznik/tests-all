// import { Language } from '@prism';

type Language = any;

export interface FileDetails {
  byteSize: string | number;
  extension: string;
  language: Language;
  text?: string | null;
  lines: number;
}
