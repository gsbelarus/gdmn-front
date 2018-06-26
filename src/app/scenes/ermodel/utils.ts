import { Key } from 'react';

import { ITableColumn, ITableRow } from '@src/app/scenes/ermodel/components/data-grid-core';

function createNameBodyRows(rowsDataMap: any): ITableRow[] {
  if (!rowsDataMap) return [];

  return Object.keys(rowsDataMap).map(
    (key, index) => ({ id: index, name: rowsDataMap[key].name }) // TODO gen uid
  );
}

function createDataBodyRows(data?: any): ITableRow[] {
  if (!data || !data.data) return [];

  return data.data.map((dataItem: any, index: number) => ({ id: index, ...dataItem }));
}

function createTableMeta(data?: any) {
  if (!data || !data.aliases) return { dataTableHeadRows: [], dataTableColumns: [] };

  const headrow: { [t: string]: any } = {};
  const dataTableColumns: ITableColumn[] = [];

  data.aliases.forEach((item: any) => {
    addHeadRowCell(item, headrow);
    dataTableColumns.push(createColumn(item));
  });
  const dataTableHeadRows = [{ id: 1, ...headrow }];

  return {
    dataTableHeadRows,
    dataTableColumns
  };
}

function addHeadRowCell(itemAlias: any, headrow: any) {
  headrow[itemAlias.values[itemAlias.attribute]] = { title: `${itemAlias.alias}.${itemAlias.attribute}` };
}

function createColumn(itemAlias: any) {
  return createTableColumn(itemAlias.values[itemAlias.attribute], 200);
}

function createTableColumn(key: Key, widthPx?: number, align?: string): ITableColumn {
  return { id: key, widthPx, align };
}

export { createNameBodyRows, createDataBodyRows, createTableMeta };
