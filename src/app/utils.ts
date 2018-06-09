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

export { isDevMode };
