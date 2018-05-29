import { deserializeERModel, ERModel, IERModel } from 'gdmn-orm';
import { connect } from 'react-redux';
import { Dispatch as ReduxDispatch } from 'redux';

import { IRootState } from '@src/app/redux/rootReducer';
import { selectErmodelState } from '@src/app/redux/selectors';
import { loadERModelError, loadERModelOk } from '@src/app/scenes/ermodel/actionCreators';
import { Actions } from './actions';
import { ERModelBox, ERModelBoxProps } from './component';
import { TableColumn, TableRowData } from '@src/app/scenes/ermodel/components/data-grid-core';
import Api from '@src/app/services/Api';

type Dispatch = ReduxDispatch<Actions>;

enum SortDirection {
  DESC,
  ASC
}
interface Sort {
  direction: SortDirection;
  fieldName: string;
}

function arraySort(sort: Sort, flatData: any[]) {
  // TODO async

  return flatData.sort((a, b) => {
    if (sort.direction === SortDirection.DESC) {
      if (b[sort.fieldName] > a[sort.fieldName]) {
        return -1;
      }
      if (a[sort.fieldName] > b[sort.fieldName]) {
        return 1;
      }
    } else {
      if (b[sort.fieldName] > a[sort.fieldName]) {
        return 1;
      }
      if (a[sort.fieldName] > b[sort.fieldName]) {
        return -1;
      }
    }
    return 0;
  });
}

function createBodyRows(erModel: ERModel): TableRowData[] {
  if (!erModel) {
    return [];
  }

  const bodyRows = Object.keys(erModel.entities).map(
    (key, index) => ({ id: index, name: erModel.entities[key].name }) // TODO gen uid
  );

  const currentSort = { fieldName: 'name', direction: SortDirection.DESC }; // TODO -> state
  return arraySort(currentSort, bodyRows);
}

export default connect(
  (state: IRootState, ownProps: ERModelBoxProps) => ({
    ...selectErmodelState(state),
    bodyRows: createBodyRows(selectErmodelState(state).erModel)
    // dataTableBodyRows: createBodyRows(selectErmodelState(state).erModel)
  }),
  (dispatch: Dispatch) => ({
    loadErModel: () => {
      fetch('http://localhost:4000/er') // TODO config
        .then(res => {
          return res.text();
        })
        .then(res => JSON.parse(res))
        .then(res => {
          return dispatch(loadERModelOk(deserializeERModel(res as IERModel)));
        })
        .catch(err => dispatch(loadERModelError(JSON.stringify(err))));
    },
    loadEntityData: () => {
      Api.queryFetch({
        link: {
          entity: 'GD_USER',
          alias: 'U',
          fields: [
            { attribute: 'NAME' },
            {
              attribute: 'CONTACTKEY',
              link: {
                entity: 'Person',
                alias: 'P',
                fields: [{ attribute: 'NAME' }]
              }
            }
          ]
        },
        options: {
          order: {
            P: { NAME: 'asc' }
          },
          where: {
            equals: {
              U: { NAME: 'Аблецова Жанна' },
              P: { NAME: 'АБЛЕЦОВА  ЖАННА  ВАЛЕРЬЕВНА ' }
            },
            not: {
              equals: {
                U: { NAME: 'test' },
                P: { NAME: 'test' }
              }
            }
          }
        }
      })
        .then((res: any) => JSON.parse(res))
        .then((res: any) => console.log(res));
    }
  })
)(ERModelBox);
