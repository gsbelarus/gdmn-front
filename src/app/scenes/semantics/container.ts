import { parsePhrase } from 'gdmn-nlp';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { EQueryTranslator } from '@core/EQueryTranslator';
import { GdmnApi } from '@src/app/services/GdmnApi';
import { IState } from '@src/app/store/reducer';
import { selectDataStoresState, selectSemanticsState } from '@src/app/store/selectors';
import { TActions } from '@src/app/store/TActions';
import { ermodelActions } from '@src/app/scenes/ermodel/actions';
import { ermodelSelector } from '@src/app/scenes/ermodel/selectors';
import { semanticsActions } from '@src/app/scenes/semantics/actions';
import {
  ISemanticsBoxActionsProps,
  ISemanticsBoxSelectorProps,
  ISemanticsBoxStateProps,
  SemanticsBox,
  TSemanticsBoxProps
} from '@src/app/scenes/semantics/component';
import {
  commandSelector,
  dataTableBodyRowsSelector,
  dataTableMetaSelector,
  sqlQuerySelector
} from '@src/app/scenes/semantics/selectors';

const getSemanticsBoxContainer = (apiService: GdmnApi) =>
  connect(
    (state: IState, ownProps: TSemanticsBoxProps): ISemanticsBoxStateProps & ISemanticsBoxSelectorProps => {
      const { erTranslatorRU, tableData, ...props } = selectSemanticsState(state); // exclude, do not remove!

      return {
        ...props,
        ...dataTableMetaSelector(state, ownProps),
        dataTableBodyRows: dataTableBodyRowsSelector(state, ownProps),
        erModel: ermodelSelector(state, ownProps),
        command: commandSelector(state, ownProps),
        sqlQuery: sqlQuerySelector(state, ownProps),
        dataStores: selectDataStoresState(state).dataStores
      };
    },
    (dispatch: Dispatch<TActions>): ISemanticsBoxActionsProps => ({
      onSetText: bindActionCreators(semanticsActions.setSemText, dispatch),
      onClearText: () => dispatch(semanticsActions.setSemText('')),
      onParse: (text: string) => dispatch(semanticsActions.setParsedText(parsePhrase(text))),
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
      loadData: async (command: any, appId: string) => {
        // TODO async action
        dispatch(semanticsActions.loadNlpDataAsync.request());

        const queries = EQueryTranslator.process(command);

        await Promise.all(
          queries.map(async query => {
            try {
              const res = await apiService.fetchEntityQuery(query, appId);
              dispatch(semanticsActions.loadNlpDataAsync.success(res));
            } catch (err) {
              dispatch(semanticsActions.loadNlpDataAsync.failure(err));
            }
          })
        );
      },
      onSelectDatastore: bindActionCreators(semanticsActions.onSelectDatastore, dispatch),
    })
  )(SemanticsBox);

export { getSemanticsBoxContainer };
