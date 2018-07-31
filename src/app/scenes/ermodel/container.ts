import { Key } from 'react';
import { Attribute, Entity, EntityLink, EntityQuery, EntityQueryField } from 'gdmn-orm';
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
import { compose } from 'recompose';
import { withRouter } from 'react-router';

interface IDispatchToProps extends IERModelBoxActionsProps {
  dispatch: any; // TODO
}

interface IStateToProps extends IERModelBoxStateProps, IERModelBoxSelectorProps {
  fieldsSelectedRowIds?: Key[];
  selectedEntity?: Entity;
  selectedFields?: Attribute[];
}

const getERModelBoxContainer = (apiService: GdmnApi) =>
  compose<any, any>(
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
        loadErModel: async (appId: string) => {
          // TODO async action
          dispatch(actions.loadERModelRequest());

          try {
            const erModel = await apiService.fetchEr(appId);
            dispatch(actions.loadERModelRequestOk(erModel));
          } catch (err) {
            dispatch(actions.loadERModelRequestError(err));
          }
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
            ? async (appId: string) => {
                // TODO async action
                if (!selectedEntity || !selectedFields) return;

                dispatch(actions.loadEntityDataRequest());

                const queryFields: EntityQueryField[] = selectedFields.map(item => new EntityQueryField(item));
                const query = new EntityQuery(new EntityLink(selectedEntity, 'alias', queryFields));

                try {
                  const res = await apiService.fetchEntityQuery(query, appId);
                  dispatch(actions.loadEntityDataRequestOk(res));
                } catch (err) {
                  dispatch(actions.loadEntityDataRequestError(err));
                }
              }
            : undefined
      })
    ),
    withRouter
  )(ERModelBox);

export { getERModelBoxContainer };
