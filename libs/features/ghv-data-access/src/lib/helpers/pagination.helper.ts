import { ClrDatagridStateInterface } from '@clr/angular/data';
import { Exact, InputMaybe, Scalars } from '../github.schema';

type DeepRequired<T> = T extends any[]
  ? DeepRequiredArray<T[number]>
  : T extends object
  ? DeepRequiredObject<T>
  : T;
interface DeepRequiredArray<T> extends Array<DeepRequired<T>> {}
type DeepRequiredObject<T> = {
  [P in keyof T]-?: T[P] extends undefined ? never : DeepRequired<T[P]>;
};
export type PaginationState = DeepRequired<
  Omit<ClrDatagridStateInterface, 'filters' | 'sort'>
>;

export type QueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  afterCursor?: InputMaybe<Scalars['String']['input']>;
  beforeCursor?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;

/**
 * Returns the variables for the query based on the current pagination state
 * using a guard clause pattern
 */
export const getPaginationVariables = (
  prevState: PaginationState,
  currState: PaginationState,
  startCursor?: string,
  endCursor?: string,
  cursorSuffix = true
) => {
  const afterKey = `after${cursorSuffix ? 'Cursor' : ''}` as
    | 'after'
    | 'afterCursor';
  const beforeKey = `before${cursorSuffix ? 'Cursor' : ''}` as
    | 'before'
    | 'beforeCursor';
  const variables: QueryVariables = {};
  const { current, size } = currState.page || {};
  const { current: pCurrent, size: pSize } = prevState?.page || {};
  if (pCurrent == current && pSize !== size) {
    variables.first = size;
    return variables;
  }

  if (!pCurrent || current == 1 || current - pCurrent > 0) {
    variables[afterKey] = current == 1 ? undefined : endCursor;
    variables.first = size;
    return variables;
  }

  variables[beforeKey] = startCursor;
  variables.last = size;
  return variables;
};
