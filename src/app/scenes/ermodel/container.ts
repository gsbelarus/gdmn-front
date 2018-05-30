import { deserializeERModel, ERModel, IERModel } from 'gdmn-orm';
import { connect } from 'react-redux';
import { Dispatch as ReduxDispatch } from 'redux';

import { IRootState } from '@src/app/store/rootReducer';
import { selectErmodelState } from '@src/app/store/selectors';
import { loadERModelError, loadERModelOk } from '@src/app/scenes/ermodel/actionCreators';
import { TActions } from './actions';
import { ERModelBox, IERModelBoxProps } from './component';
import { ITableRowData } from '@src/app/scenes/ermodel/components/data-grid-core';
import Api from '@src/app/services/Api';

type TDispatch = ReduxDispatch<TActions>;

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

function createBodyRows(erModel: ERModel): ITableRowData[] {
  if (!erModel) return [];

  const bodyRows = Object.keys(erModel.entities).map(
    (key, index) => ({ id: index, name: erModel.entities[key].name }) // TODO gen uid
  );

  const currentSort = { fieldName: 'name', direction: SortDirection.DESC }; // TODO -> state
  return arraySort(currentSort, bodyRows);
}

export default connect(
  (state: IRootState, ownProps: IERModelBoxProps) => ({
    ...selectErmodelState(state),
    //bodyRows: createBodyRows(selectErmodelState(state).erModel)
    // dataTableBodyRows: createBodyRows(selectErmodelState(state).erModel)
  }),
  (dispatch: TDispatch) => ({
    loadErModel: () => {
      Api.fetchEr()
        .then(res => {
          return dispatch(loadERModelOk(deserializeERModel(<IERModel>res)));
        })
        .catch((err:Error) => dispatch(loadERModelError(err.message)));
    },
    loadEntityData: () => {
      Api.fetchQuery({
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
        .then(res => console.log(res))
        .catch((err: Error) => dispatch(loadERModelError(err.message))); // todo custom action
    }
  })
)(ERModelBox);
