import { Key } from 'react';
import { Attribute, Entity, EntityLink, EntityQuery, EntityQueryField } from 'gdmn-orm';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { GdmnApi } from '@src/app/services/GdmnApi';
import { IState } from '@src/app/store/reducer';
import { selectErmodelState } from '@src/app/store/selectors';
import { ermodelActions, TErModelActions } from '@src/app/scenes/ermodel/actions';
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
import { compose, lifecycle } from 'recompose';
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
          dispatch(ermodelActions.loadErModelAsync.request());

          try {
            const erModel = await apiService.fetchEr(appId);
            dispatch(ermodelActions.loadErModelAsync.success(erModel));
          } catch (err) {
            dispatch(ermodelActions.loadErModelAsync.failure(err));
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

                dispatch(ermodelActions.loadEntityDataAsync.request());

                const queryFields: EntityQueryField[] = selectedFields.map(item => new EntityQueryField(item));
                const query = new EntityQuery(new EntityLink(selectedEntity, 'alias', queryFields));

                try {
                  const res = await apiService.fetchEntityQuery(query, appId);
                  dispatch(ermodelActions.loadEntityDataAsync.success(res));
                } catch (err) {
                  dispatch(ermodelActions.loadEntityDataAsync.failure(err));
                }
              }
            : undefined
      })
    ),
    withRouter
  )(ERModelBox);

export { getERModelBoxContainer };
