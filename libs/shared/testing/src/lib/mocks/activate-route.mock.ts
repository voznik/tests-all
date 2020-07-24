// tslint:disable:ban-types
import { of, Observable } from 'rxjs';
interface MockRouteConfig {
  data?: any;
  params?: any;
  parent?: Partial<MockRouteConfig>;
  queryParams?: any;
  url?: Observable<{ path: string }[]>;
  snapshot?: {
    params?: any;
    queryParams?: any;
    data?: any;
    paramMap?: any;
  };
}

export function activateRouteMockFactory(config: MockRouteConfig) {
  return () => ({
    parent: {
      params: of(config.parent?.params || null),
      snapshot: config.parent?.snapshot || null,
      url: config?.url || of([]),
    },
    data: of(config.data || null),
    params: of(config.params || null),
    queryParams: of(config.queryParams || null),
    snapshot: config.snapshot,
  });
}
