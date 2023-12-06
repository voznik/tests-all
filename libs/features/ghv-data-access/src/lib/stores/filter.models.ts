export interface FilterOption {
  label: string;
  value: string;
}

export enum TypeFilter {
  ALL = 'all',
  FORKED = 'forked',
  ARCHIVED = 'archived',
}

export interface LanguageFilter {
  label: string;
  value: string;
}
