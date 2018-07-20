import { ComponentType } from 'react';

function promisify<T>(fn: Function, context = null): (...args: any[]) => Promise<T> {
  return (...args) =>
    new Promise<T>((resolve, reject) => {
      fn.call(
        context,
        ...[
          ...args,
          (err: any, ...results: any[]) => {
            err ? reject(err) : resolve(results.length ? results[0] : results);
          }
        ]
      );
    });
}

/**
 * function that performs no operations
 */
const noop = Object.freeze(() => {
  /**/
});

function isDevMode() {
  return process.env.NODE_ENV !== 'production';
}

const enum SortDirection {
  DESC,
  ASC
}
interface ISort {
  direction: SortDirection;
  fieldName: string;
}

function arraySort(sort: ISort, flatData: any[]) {
  // TODO async

  return flatData.sort((a, b) => {
    if (sort.direction === SortDirection.DESC) {
      if (b[sort.fieldName] > a[sort.fieldName]) return -1;
      if (a[sort.fieldName] > b[sort.fieldName]) return 1;
    } else {
      if (b[sort.fieldName] > a[sort.fieldName]) return 1;
      if (a[sort.fieldName] > b[sort.fieldName]) return -1;
    }
    return 0;
  });
}

// react

function getDisplayName(component: ComponentType<any>) {
  return component.displayName || component.name || 'Component';
}

function getHOCDisplayName(hocName: string, component: ComponentType<any>) {
  return `${hocName}(${getDisplayName(component)})`;
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

export { promisify, isDevMode, Subtract };
