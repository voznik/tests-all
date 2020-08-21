import { InjectionToken } from '@angular/core';

export interface NavItem {
  id: string;
  icon?: string;
  label: string;
  route: string | null;
  link?: string;
}

export const TOP_LEVEL_MENU = new InjectionToken<NavItem>('TopLevelMenu');
