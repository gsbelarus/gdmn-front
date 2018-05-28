import React, { Component, Key, ReactType } from 'react';

interface TableRowData {
  id: Key;
  [t: string]: any;
}

interface TableColumn {
  id: Key;
  widthPx?: number | null;
  align?: string | null;
  [t: string]: any;
}

interface TableLayoutProps {
  bodyRows?: TableRowData[];
  columns?: TableColumn[];
  footRows?: TableRowData[];
  headRows?: TableRowData[];
  minColumnWidthPx?: number;
  renderBody: ReactType;
  renderBodyCell: ReactType;
  renderColGroup: ReactType; // 'colgroup',
  renderColGroupCol: ReactType; // 'col'
  renderFoot?: ReactType;
  renderFootCell?: ReactType;
  renderHead?: ReactType;
  renderHeadCell?: ReactType;
  renderRow: ReactType;
  renderTable: ReactType;
  [t: string]: any;
}

// TODO arrow -> renderItem
// TODO col, cell types

class TableLayout extends Component<TableLayoutProps, any> {
  public static defaultProps = {
    columns: [],
    bodyRows: [],
    footRows: [],
    headRows: []
  };

  constructor(props: TableLayoutProps) {
    super(props);

    this.getMinWidth = this.getMinWidth.bind(this);
  }

  private getMinWidth(columns: TableColumn[]): number {
    const { minColumnWidthPx } = this.props;

    return columns.map(column => column.widthPx || minColumnWidthPx || 0).reduce((acc, width) => acc + width, 0) || 0;
  }

  public render(): JSX.Element {
    const {
      columns = [],
      headRows,
      bodyRows,
      footRows,
      renderTable: Table,
      renderHead: Head,
      renderBody: Body,
      renderFoot: Foot,
      renderRow: Row,
      renderHeadCell: HeadCell,
      renderBodyCell: BodyCell,
      renderFootCell: FootCell,
      renderColGroup: ColGroup,
      renderColGroupCol: Col
    } = this.props;

    const minWidth = this.getMinWidth(columns);

    return (
      <Table style={{ minWidth: `${minWidth}px` }}>
        {ColGroup && (
          <ColGroup>
            {columns.map(column => <Col key={column.id} style={{ width: column.widthPx }} column={column} />)}
          </ColGroup>
        )}
        {Head && (
          <Head>
            {!!headRows &&
              headRows.map(row => (
                <Row key={row.id}>
                  {HeadCell && columns.map(column => <HeadCell key={column.id} column={column} rowData={row} />)}
                </Row>
              ))}
          </Head>
        )}
        <Body>
          {!!bodyRows &&
            bodyRows.map(row => (
              <Row key={row.id}>
                {columns.map(column => <BodyCell key={column.id} column={column} rowData={row} />)}
              </Row>
            ))}
        </Body>
        {Foot && (
          <Foot>
            {!!footRows &&
              footRows.map(row => (
                <Row key={row.id}>
                  {FootCell && columns.map(column => <FootCell key={column.id} column={column} rowData={row} />)}
                </Row>
              ))}
          </Foot>
        )}
      </Table>
    );
  }
}

export { TableLayout, TableLayoutProps, TableColumn, TableRowData };
