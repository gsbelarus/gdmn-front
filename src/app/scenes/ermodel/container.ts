import { Key } from 'react';
import { Attribute, deserializeERModel, Entity, EntityLink, EntityQuery, EntityQueryField, IERModel } from 'gdmn-orm';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GdmnApi } from '@src/app/services/GdmnApi';
import { IState } from '@src/app/store/reducer';
import { selectErmodelState } from '@src/app/store/selectors';
import { actions, TErModelActions } from '@src/app/scenes/ermodel/actions';
import {
  ERModelBox,
  IERModelBoxActionsProps,
  IERModelBoxSelectorProps,
  IERModelBoxStateProps,
  TERModelBoxProps
} from '@src/app/scenes/ermodel/component';
import {
  dataTableBodyRowsSelector,
  dataTableMetaSelector,
  entitiesTableBodyRowsSelector,
  fieldsTableBodyRowsSelector,
  selectedEntitySelector,
  selectedFieldsSelector
} from '@src/app/scenes/ermodel/selectors';

interface IDispatchToProps extends IERModelBoxActionsProps {
  dispatch: any; // TODO
}

interface IStateToProps extends IERModelBoxStateProps, IERModelBoxSelectorProps {
  fieldsSelectedRowIds?: Key[];
  selectedEntity?: Entity;
  selectedFields?: Attribute[];
}

const getERModelBoxContainer = (apiService: GdmnApi) =>
  connect(
    (state: IState, ownProps: TERModelBoxProps): IStateToProps => {
      const { entitiesSelectedRowId, tableData, ...props } = selectErmodelState(state); // exclude, do not remove!

      return {
        ...props,
        ...dataTableMetaSelector(state, ownProps),
        dataTableBodyRows: dataTableBodyRowsSelector(state, ownProps),
        entitiesTableBodyRows: entitiesTableBodyRowsSelector(state, ownProps),
        //
        fieldsTableBodyRows: fieldsTableBodyRowsSelector(state, ownProps),
        selectedEntity: selectedEntitySelector(state, ownProps),
        selectedFields: selectedFieldsSelector(state, ownProps)
      };
    },
    (dispatch: Dispatch<TErModelActions>): IDispatchToProps => ({
      loadErModel: () => {
        // TODO async action
        dispatch(actions.loadERModelRequest());
        apiService
          .fetchEr()
          .then(res => {
            return dispatch(actions.loadERModelRequestOk(deserializeERModel(<IERModel>res)));
          })
          .catch((err: Error) => dispatch(actions.loadERModelRequestError(err)));
      },
      dispatch
    }),
    (
      { fieldsSelectedRowIds, selectedEntity, selectedFields, ...stateProps }, // exclude, do not remove!
      { loadData, dispatch, ...dispatchProps },
      ownProps: TERModelBoxProps
    ): TERModelBoxProps => ({
      ...stateProps,
      ...dispatchProps,
      loadData:
        fieldsSelectedRowIds && fieldsSelectedRowIds.length > 0
          ? () => {
              // TODO async action
              if (!selectedEntity || !selectedFields) return;

              dispatch(actions.loadEntityDataRequest());

              const queryFields: EntityQueryField[] = selectedFields.map(item => new EntityQueryField(item));
              const query = new EntityQuery(new EntityLink(selectedEntity, 'alias', queryFields));

              apiService
                .fetchQuery(query, 'er')
                .then(res => dispatch(actions.loadEntityDataRequestOk(res)))
                .catch((err: Error) => dispatch(actions.loadEntityDataRequestError(err)));
            }
          : undefined
    })
  )(ERModelBox);

export { getERModelBoxContainer };
